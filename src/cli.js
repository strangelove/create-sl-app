import arg from "arg";
import inquirer from "inquirer";

import createApp from "./main.js";

/*
  1- Recive the command line arguments
  2- Parse the arguments into an options object
  3- Prompt the user for any missing options
  4- Create the app
*/

/* 
  A function that prompts the user for any missing options and returns 
  a new options object with the user's answers
*/
async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";
  const defaultProjectName = "my-app";
  const questions = [];

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "What is your project named?",
      default: defaultProjectName,
    });
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["Javascript", "Typescript"],
      default: defaultTemplate,
    });
  }

  if (!options.contentful) {
    questions.push({
      type: "confirm",
      name: "contentful",
      message: "Do you want to use Contentful CMS?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    name: options.name || answers.name,
    contentful: options.contentful || answers.contentful,
  };
}

/* 
  Higher Order Function that parses the command line arguments
  into options object, then passes it to a its callback param 
*/
function withParsedArgsIntoOpts(callback) {
  return async (rawArgs) => {
    const args = arg(
      {
        "--yes": Boolean,
        "--typescript": Boolean,
        "--contentful": Boolean,
        "-y": "--yes",
        "-t": "--typescript",
        "-ctf": "--contentful",
      },
      {
        argv: rawArgs.slice(2),
      }
    );

    return await callback({
      skipPrompts: args["--yes"] || false,
      name: args._[0],
      template: args["--typescript"] ? "Typescript" : undefined,
      contentful: args["--contentful"] || false,
    });
  };
}

export async function cli(args) {
  const options = await withParsedArgsIntoOpts(promptForMissingOptions)(args);
  return await createApp(options);
}
