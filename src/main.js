import { projectInstall } from "pkg-install";
import { promisify } from "util";
// const execa = require("execa");
// const execa = import("execa");
// import execa from "execa";
import Listr from "listr";
import chalk from "chalk";
import path from "path";
import ncp from "ncp";
import fs from "fs";

/*
  1- Copy template files.
  2- Initialize git.
  3- Install dependencies. 
*/

const access = promisify(fs.access);

const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }

  return;
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

  console.log(`import.meta`, import.meta);
  console.log(`currentFileUrl`, currentFileUrl);
  console.log(`templateDir`, templateDir);
  console.log(`options`, options);

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));

    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },

    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git,
    },

    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install dependencies"
          : undefined,
    },
  ]);

  await tasks.run();

  console.log("%s Project ready", chalk.green.bold("DONE"));

  return true;
}
