import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import { mkdir, rm, readdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { program } from "commander";
import colors from "colors";

console.log(colors.green(colors.bold("Another one ☝️")));

async function isEmpty(path: string) {
  return (await readdir(path)).length === 0;
}

async function emptyDir(dir: string) {
  if (!existsSync(dir)) return;
  const files = await readdir(dir);
  for (const file of files)
    await rm(path.resolve(dir, file), { recursive: true, force: true });
}

program
  .argument("[directory]", "Project slug")
  .option("-t, --template <template>", "Template")
  .parse(process.argv);

async function init() {
  //find answers
  const answers = {
    name: (
      program.args[0] ||
      (
        await inquirer.prompt({
          name: "name",
          message: "Project name:",
          type: "input",
          validate: (x) =>
            /^[a-z0-9\-]+$/gi.test(x)
              ? true
              : `Only "-" and alphanumeric characters allowed`,
        })
      ).name
    ).toLowerCase(),

    template:
      program.opts().template ||
      (
        await inquirer.prompt({
          name: "template",
          message: "Select a framework:",
          type: "list",
          choices: [
            { name: colors.white("Website"), value: "web" },
            { name: colors.green("Mobile App"), value: "app" },
            { name: colors.blue("Desktop App"), value: "desktop" },
            { name: colors.cyan("Kiosk"), value: "kiosk" },
            { name: colors.yellow("Library"), value: "lib" },
          ],
        })
      ).template,
  };

  //ensure path
  const projectPath = path.join(
    process.cwd(),
    `./${answers.name.toLowerCase()}`
  );
  if (!existsSync(projectPath)) await mkdir(projectPath);

  //make sure directory is
  if (!(await isEmpty(projectPath))) {
    if (
      (
        await inquirer.prompt({
          name: "remove",
          message: `Target directory ${colors.bold(
            `"${answers.name}"`
          )} is not empty. Remove existing files and continue?`,
          type: "confirm",
        })
      ).remove
    )
      await emptyDir(projectPath);
    else {
      console.log(colors.red("❌ Cancelled"));
      return;
    }
  }

  //clone template
  const git = simpleGit(projectPath);
  await git.clone(
    `git@github.com:sFrady20/template-${answers.template}.git`,
    `../${answers.name}`,
    ["--depth=1", "--branch=main"]
  );

  //remove template git history
  const projectGitPath = path.join(projectPath, "./.git");
  await rm(projectGitPath, { recursive: true, force: true });

  //reinitialize git
  await git.init();

  console.log(`Project created at ${colors.bold(`"${projectPath}"`)}`);
  console.log(colors.bgBlack(colors.blue(`cd ./${answers.name}; yarn;`)));
}

init();
