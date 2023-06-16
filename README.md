## create-another-one

`create-another-one` allows users to create a new project based on a template by running `npm create-another-one` or `yarn create another-one` and specifying the options and arguments.

### Usage

To use the script, follow these steps:

1. Open your terminal or command prompt.
2. Run the script using either of the following commands:
   - `npm create-another-one [directory]` (replace `[directory]` with the desired project slug)
   - `yarn create another-one [directory]` (replace `[directory]` with the desired project slug)
3. Optionally, provide the `-t` or `--template` flag followed by the desired template value.
4. Follow the prompts and provide the required information.
5. The script will download the specified template into a new directory and initialize the Git history for the project.

### Command-Line Options

The script supports the following command-line options:

- `-t, --template <template>`: Specifies the template to use for the project. Available options are:
  - `web`: Website template
  - `app`: Mobile App template
  - `desktop`: Desktop App template
  - `lib`: Library template
  - `kiosk`: Kiosk template

### Example Usage

```shell
# Create a new project with a specific name and template
$ npm create-another-one my-project -t web

# Create a new project with a specific name and template (using Yarn)
$ yarn create another-one my-project --template app

# Create a new project with default name and prompt for template selection
$ npm create-another-one

# Create a new project with default name and prompt for template selection (using Yarn)
$ yarn create another-one
```

These are just examples, and you can adjust the commands and options as needed based on your requirements.
