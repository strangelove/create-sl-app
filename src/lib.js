import { promisify } from "util";
import execa from "execa";
import ncp from "ncp";
import fs from "fs";

const access = promisify(fs.access);
const copy = promisify(ncp);
const mkdir = promisify(fs.mkdir);

const dependencies = ["formik", "contentful"];
const devDependencies = [
  "sass",
  "tailwindcss",
  "postcss",
  "autoprefixer",
];

// Create Next.js app
export async function createNextApp(options) {
  const ts = options['template'] === 'Typescript' ? '--typescript' : '';

  const result = await execa("npx", ["create-next-app", options.name, ts], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to create Next app"));
  }
}

// Install dependencies
export async function installPackages(options) {
  const projectDir = `${options.targetDirectory}/${options.name}`

  try {
    // - install dependencies
    await execa("npm", ["i", ...dependencies], {
      cwd: projectDir,
    });

    // - install dev dependencies  
    await execa("npm", ["install", "--save-dev", ...devDependencies], {
      cwd: projectDir,
    });

    // - init tailwind config files
    await execa("npx", ["tailwindcss", "init", "-p"], {
      cwd: projectDir,
    });
  } catch (error) {
    return Promise.reject(new Error("Failed to install dependencies", error));
  }
}

// Restructure files
export async function structureFiles(options) {
  const rootDir = `${options.targetDirectory}/${options.name}`;

  try {
    await access(rootDir, fs.constants.F_OK);

    // create src
    await mkdir(`${rootDir}/src`, { recursive: true })

    // Delete pages & styles directories
    await execa("rm", ["-rf", `${rootDir}/pages`, `${rootDir}/styles`], {
      cwd: rootDir,
    });
  } catch (error) {
    return Promise.reject(new Error("Failed to structure files", error));
  }
}

// Copy template files
export async function copyTemplateFiles(options) {
  try {
    // copy src files
    await copy(
      `${options.templateDirectory}/src`,
      `${options.targetDirectory}/${options.name}/src`,
      { clobber: true, }
    );

    // copy config files
    await copy(
      `${options.templateDirectory}/config`,
      `${options.targetDirectory}/${options.name}`,
      { clobber: true, }
    );

  } catch (error) {
    return Promise.reject(new Error("Failed to copy template files", error));
  }
}
