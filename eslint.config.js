import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import pluginJs from "@eslint/js";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ...tseslint.parserOptions,
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: "latest",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: eslintPluginImport,
      "@typescript-eslint": tseslint.plugin,
      prettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      "prettier/prettier": "error",
    },
  },
];
