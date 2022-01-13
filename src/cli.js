import arg from "arg";
import inquirer from "inquirer";

import createApp from './main.js'

/*
  1- Recive the command line arguments
  2- Parse the arguments into an options object
  3- Prompt the user for any missing options
  4- Create the app
*/

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--typescript": Boolean,
      "-y": "--yes",
      "-t": "--typescript",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    name: args._[0],
    template: args['--typescript'] ? 'Typescript' : undefined,
    runInstall: args["--install"] || false,
  };
}

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
  
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    name: options.name || answers.name,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createApp(options)
}
