This is more of a reference when I get stuck with logistical set up stuff.

### Setting up eslint

[This should help to get started.](https://thesoreon.com/blog/how-to-set-up-eslint-with-typescript-in-vs-code)

- Add this to the `.eslintrc.json` in your root directory for the project:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "semi": ["error", "never"],
    "quotes": [2, "double"]
    // more rules...
  }
}
```

- Run `eslint --ext ts,tsx . --fix` to automatically format files based on given rules.
- In case there's errors regarding the eslint, there may be conflicting eslint versions. uninstall whatever that is installed locally and just use the globally installed version. Install the global version with `npm install -g eslint` and then `npm i -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin` to make it work on the project for typescript.

### Some Next/tailwind Troubleshooting

- If the tailwind css styles don't seem to go through
  - check the `content` section and make sure that the folders are pointed to correctly.
