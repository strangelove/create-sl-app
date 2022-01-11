import { promisify } from "util";
import execa from "execa";
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
  return await copy(
    `${options.templateDirectory}/src`,
    `${options.targetDirectory}/${options.name}`,
    { clobber: false, }
  );
}

async function createNextApp(options) {
  const ts = options['template'] === 'Typescript' ? '--typescript' : '';
  const result = await execa("npx", ["create-next-app", options.name, ts], {
    cwd: options.targetDirectory,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to create Next app"));
  }
}

const initDependencies = [
  "formik",
  "sass",
  "tailwindcss",
];

async function installDependencies(options) {
  const result = await execa("npm", ["i", ...initDependencies], {
    cwd: `${options.targetDirectory}/${options.name}`,
  });

  if (result.failed) {
    return Promise.reject(new Error("Failed to create Next app"));
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
      title: "Install dependencies",
      task: () => installDependencies(options),
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
