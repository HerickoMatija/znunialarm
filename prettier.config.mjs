/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'es5',
  tailwindFunctions: ['clsx', 'tw'],
  jsonRecursiveSort: true,
  jsonSortOrder: '{"*": "lexical"}',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss', 'prettier-plugin-sort-json'],
}

export default config
