import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import { mkdir, rm } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { program } from "commander";

program
  .argument("[directory]", "Project slug")
  .option("-t, --template <template>", "Template")
  .parse(process.argv);

(async () => {
  //find answers
  const answers = {
    name:
      program.args[0] ||
      (
        await inquirer.prompt({
          name: "name",
          message: "What's the name of your project?",
          type: "input",
          validate: (x) => (/^[a-z0-9\-]+$/gi.test(x) ? true : "invalid"),
        })
      ).name,
    template:
      program.opts().template ||
      (
        await inquirer.prompt({
          name: "template",
          message: "What are you making?",
          type: "list",
          choices: [
            { name: "Website", value: "web" },
            { name: "Mobile App", value: "app" },
            { name: "Desktop App", value: "desktop" },
            { name: "Library", value: "lib" },
            { name: "Kiosk", value: "kiosk" },
          ],
        })
      ).template,
  };

  //ensure path
  const projectPath = path.join(process.cwd(), `./${answers.name}`);
  if (!existsSync(projectPath)) await mkdir(projectPath);

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
})();
