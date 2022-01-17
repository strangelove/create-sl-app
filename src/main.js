import { promisify } from "util";
import Listr from "listr";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import {
  createNextApp,
  installPackages,
  structureFiles,
  copyTemplateFiles,
  initContentful,
} from "./lib";

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

const dependencies = {
  main: ["formik"],
  dev: ["sass", "tailwindcss", "postcss", "autoprefixer", "dotenv"],
  ctfDev: [
    "@contentful/rich-text-from-markdown",
    "@contentful/rich-text-react-renderer",
    "@contentful/rich-text-types",
    "@graphql-codegen/cli",
    "@graphql-codegen/typescript",
    "graphql",
  ],
};

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
  if (options.contentful)
    dependencies.main.push("contentful", "graphql-request");

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
      title: "Initialize Contentful",
      task: () => initContentful(options, dependencies),
      enabled: () => options.contentful,
    },
    {
      title: "Install packages",
      task: () => installPackages(options, dependencies),
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

  if (options.contentful) {
    console.log(
      `%s create ${chalk.greenBright(
        ".env.local"
      )} file and add your Contentful credentials before running ${chalk.cyanBright(
        `npm run dev`
      )}`,
      chalk.bgRed.white("IMPORTANT")
    );
  } else {
    console.log(`%s cd ${options.name} & npm run dev`, chalk.cyanBright("RUN"));
  }

  return true;
}
