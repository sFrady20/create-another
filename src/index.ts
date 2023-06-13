import inquirer from "inquirer";

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

  console.log(answers);
})();
