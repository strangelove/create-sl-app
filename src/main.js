import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import chalk from "chalk";
import path from "path";
import ncp from "ncp";
import fs from "fs";

/* STEPS :
  1- Create Next.js app
  2- Install dependencies :
      - Styles (sass & tailwind)
      - Contentful
      - Formik
  3- Restructure files: 
      - Delete pages & styles directories
      - Create src directory
  3- Copy template files: 
      - src
      - env files
      - tailwind.config.js
      - next.config.js
      - tsconfig.json
*/

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

export default async function createApp(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Create Next.js app",
      task: () => createNextApp(options),
    },
    {
      title: "Install packages",
      task: () => installPackages(options),
    },
    {
      title: "Structure project files",
      task: () => structureFiles(options),
    },
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
  ]);

  await tasks.run();

  console.log("%s Project ready", chalk.green.bold("DONE"));

  return true;
}
