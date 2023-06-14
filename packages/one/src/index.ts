import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import { mkdir, rm } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

(async () => {
  const answers = await inquirer.prompt([
    {
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
    },
    {
      name: "name",
      message: "What's the name of your project?",
      type: "input",
      validate: (x) => (/^[a-z0-9\-]+$/gi.test(x) ? true : "invalid"),
    },
  ]);

  const projectPath = path.join(process.cwd(), `./${answers.name}`);
  if (!existsSync(projectPath)) await mkdir(projectPath);
  const git = simpleGit(projectPath);
  await git.clone(
    `git@github.com:sFrady20/template-${answers.template}.git`,
    `../${answers.name}`,
    ["--depth=1"]
  );
  const projectGitPath = path.join(projectPath, "./.git");
  await rm(projectGitPath, { recursive: true, force: true });
  await git.init();
})();
