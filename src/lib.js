import { promisify } from "util";
import execa from "execa";
import ncp from "ncp";
import fs from "fs";

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
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
  const projectRootDir = `${options.targetDirectory}/${options.name}`;
  const devScript = "npm run gen && next dev";
  const genScript =
    "DOTENV_CONFIG_PATH=./.env.local graphql-codegen --require dotenv/config --config codegen.yml";

  try {
    // install Contentful SDKs
    await execa("npm", ["i", "--save-dev", ...ctfDev], {
      cwd: projectRootDir,
    });

    await access(projectRootDir, fs.constants.F_OK);

    // Read the package.json
    const packageJson = JSON.parse(
      await readFile(`${projectRootDir}/package.json`, "utf8")
    );

    // Update the dev script and add gen script
    packageJson.scripts.dev = devScript;
    packageJson.scripts.gen = genScript;

    // Write the new package.json
    await writeFile(
      `${projectRootDir}/package.json`,
      JSON.stringify(packageJson, null, 2)
    );
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to install Contentful SDKs: ${error.message}`)
    );
  }
}

// Install dependencies
export async function installPackages(options, { main, dev }) {
  const projectRootDir = `${options.targetDirectory}/${options.name}`;

  try {
    // - install dependencies
    await execa("npm", ["i", ...main], {
      cwd: projectRootDir,
    });

    // - install dev dependencies
    await execa("npm", ["install", "--save-dev", ...dev], {
      cwd: projectRootDir,
    });

    // - init tailwind config files
    await execa("npx", ["tailwindcss", "init", "-p"], {
      cwd: projectRootDir,
    });
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to install dependencies: ${error.message}`)
    );
  }
}

// Setup pre-commit hooks with husky
export async function setupHusky(options) {
  const projectRootDir = `${options.targetDirectory}/${options.name}`;
  const preCommitScript = "npm run lint --fix && git add -A .";
  const preCommitHook = "npm run pre-commit";

  try {
    // - init husky config files
    await execa("npm", ["set-script", "prepare", "husky install"], {
      cwd: projectRootDir,
    }).then(() => {
      execa("npm", ["run", "prepare"], {
        cwd: projectRootDir,
      }).then(() => {
        execa(
          "npx",
          ["husky", "add", ".husky/pre-commit", `${preCommitHook}`],
          {
            cwd: projectRootDir,
          }
        );
      });
    });

    // Read the package.json
    await access(projectRootDir, fs.constants.F_OK);

    const packageJson = JSON.parse(
      await readFile(`${projectRootDir}/package.json`, "utf8")
    );

    // Add pre-commit script
    packageJson.scripts["pre-commit"] = preCommitScript;

    // Write the new package.json
    await writeFile(
      `${projectRootDir}/package.json`,
      JSON.stringify(packageJson, null, 2)
    );
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to install husky: ${error.message}`)
    );
  }
}

// Restructure files
export async function structureFiles(options) {
  const projectRootDir = `${options.targetDirectory}/${options.name}`;

  try {
    await access(projectRootDir, fs.constants.F_OK);

    // create src
    await mkdir(`${projectRootDir}/src`, { recursive: true });

    // Delete pages & styles directories
    await execa(
      "rm",
      ["-rf", `${projectRootDir}/pages`, `${projectRootDir}/styles`],
      {
        cwd: projectRootDir,
      }
    );
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to structure files: ${error.message}`)
    );
  }
}

// Copy template files
export async function copyTemplateFiles(options) {
  const projectRootDir = `${options.targetDirectory}/${options.name}`;

  try {
    await access(projectRootDir, fs.constants.F_OK);

    // copy src files
    await copy(`${options.templateDirectory}/src`, `${projectRootDir}/src`, {
      clobber: true,
    });

    // copy config files
    await copy(`${options.templateDirectory}/config`, `${projectRootDir}`, {
      clobber: true,
    });

    if (options.contentful) {
      // copy codegen.yml file
      await copy(
        `${options.templateDirectory}/codegen.yml`,
        `${projectRootDir}/codegen.yml`,
        {
          clobber: true,
        }
      );

      // create services directory
      await mkdir(`${projectRootDir}/src/services`, { recursive: true });

      // copy contentful files
      await copy(
        `${options.templateDirectory}/services/contentful`,
        `${projectRootDir}/src/services/contentful`,
        { clobber: true }
      );
    }
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to copy template files: ${error.message}`)
    );
  }
}
