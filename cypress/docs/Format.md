# Format Javascript code with Prettier

1. I've installed Prettier as a dev dependency to reformat our JavaScript code consistently every time we save:

```
npm install --save-dev --save-exact prettier
```

2. I've added a new file `.prettierrc.json` under the root of the project with the below settings (no semi-colons and no trailing commas):

```
{
    "trailingComma": "all",
    "tabWidth": 2,
    "semi": false,
    "singleQuote": true
}
```

3. As I'm using VSCode, I've also installed the [Prettier VSCode extension](https://github.com/prettier/prettier-vscode) by launching the VS Code Quick Open tool (Ctrl/Cmd + P) and running the following command:

```
ext install esbenp.prettier-vscode
```

4. Next, I've created a `.vscode` folder and `settings.json` file with the following settings and committed it to my repository:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false, // no formatting code on Paste action
  "editor.fontSize": 14, // override global font size
  "editor.wordWrap": "on"
}
```

5. Finally, I've added a script to run Prettier from the CLI and on every sub-folder and files within the `cypress` folder.

```
"format": "prettier --write './cypress/**/*.js'"
```

5. a Run from the CLI:

```
npm run format
```

🪄 **Tip**:

- In the VSCode global settings, I've enabled the option to only allow running Prettier in the folders with a Prettier config file.
  Look for the `Prettier: Require Config` setting and check the option for `Require a prettier configuration file to format`.
  This way we can avoid accidentally changing how the code is formatted in those projects where I don't want to use these specific Prettier settings.
