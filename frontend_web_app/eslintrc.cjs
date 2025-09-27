module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {},
  ignorePatterns: ["dist/**"],
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "off"
  }
}
