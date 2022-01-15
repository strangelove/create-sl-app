import { promisify } from "util";
import execa from "execa";
import ncp from "ncp";
import fs from "fs";

const access = promisify(fs.access);
const copy = promisify(ncp);
const mkdir = promisify(fs.mkdir);

// Create Next.js app
export async function createNextApp(options) {
  const ts = options["template"] === "Typescript" ? "--typescript" : "";

  const result = await execa("npx", ["create-next-app", options.name, ts], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to create Next app"));
  }
}

// Initialize Contentful
export async function initContentful(options, { ctfDev }) {
  const projectDir = `${options.targetDirectory}/${options.name}`;

  try {
    // - install Contentful SDKs
    await execa("npm", ["i", "--save-dev", ...ctfDev], {
      cwd: projectDir,
    });
  } catch (error) {
    return Promise.reject(
      new Error("Failed to install Contentful SDKs", error)
    );
  }
}

// Install dependencies
export async function installPackages(options, { main, dev }) {
  const projectDir = `${options.targetDirectory}/${options.name}`;

  try {
    // - install dependencies
    await execa("npm", ["i", ...main], {
      cwd: projectDir,
    });

    // - install dev dependencies
    await execa("npm", ["install", "--save-dev", ...dev], {
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
    await mkdir(`${rootDir}/src`, { recursive: true });

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
  const rootDir = `${options.targetDirectory}/${options.name}`;

  try {
    await access(rootDir, fs.constants.F_OK);

    // copy src files
    await copy(
      `${options.templateDirectory}/src`,
      `${rootDir}/src`,
      { clobber: true }
    );

    // copy config files
    await copy(
      `${options.templateDirectory}/config`,
      `${rootDir}`,
      { clobber: true }
    );

    if (options.contentful) {
      // create services directory
      await mkdir(`${rootDir}/src/services`, { recursive: true });

      // copy contentful files
      await copy(
        `${options.templateDirectory}/services/contentful`,
        `${rootDir}/src/services/contentful`,
        { clobber: true }
      );
    }
  } catch (error) {
    return Promise.reject(new Error("Failed to copy template files", error));
  }
}
