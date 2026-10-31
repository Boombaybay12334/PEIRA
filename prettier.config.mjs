import * as prettierPluginAstro from "prettier-plugin-astro";

/** @type {import("prettier").Config} */
export default {
  plugins: [prettierPluginAstro],
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};
