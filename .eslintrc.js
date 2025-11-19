module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  plugins: ['unused-imports', 'mui-unused-classes', 'prefer-arrow'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  rules: {
    "no-dupe-keys": "error",
    "react/display-name": "off",
    "react/prop-types": 0,
    "react/no-find-dom-node": 0,
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
      },
    ],
    // "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        path: "always",
        types: "prefer-import",
        lib: "always",
      },
    ],
    "@typescript-eslint/unified-signatures": "error",
    "constructor-super": "error",
    "id-match": "error",
    // "import/no-extraneous-dependencies": "error",
    "import/no-extraneous-dependencies": 0,
    "react-hooks/exhaustive-deps": 0, //Just for now, this is important
    "jsx-a11y/alt-text": 0, //Just for now
    "react-hooks/rules-of-hooks": 0, //Really bad
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-debugger": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "no-empty": "warn",
    "no-extra-bind": "error",
    "no-extra-semi": "warn",
    "no-fallthrough": "warn",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-redeclare": "error",
    "no-return-await": "error",
    "no-sequences": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-object-spread": "error",
    radix: "error",
    "unused-imports/no-unused-imports": "error",
    "use-isnan": "error",
    "valid-typeof": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    eqeqeq: ["error", "smart"],
    "mui-unused-classes/unused-classes": "warn",
    "prefer-arrow/prefer-arrow-functions": "error",
    "react/self-closing-comp": "error",
    "react/jsx-boolean-value": "error",
    "@typescript-eslint/typedef": "error",
    // "linebreak-style": [
    //   "error",
    //   process.platform === "win32" ? "windows" : "unix",
    // ],
    "linebreak-style": 0,
    "@typescript-eslint/no-this-alias": "error", // TODO baseapp violates this
    "no-invalid-this": "error", // TODO found some more
    "no-undef": "error", // TODO getting close
    "react/jsx-key": "error",
    "no-dupe-args": "error",
    // "no-unreachable": "error", //TODO just in map currently

    // "@typescript-eslint/ban-types": [
    //     "error",
    //     {
    //         "types": {
    //             "Object": {
    //                 "message": "Avoid using the `Object` type. Did you mean `object`?"
    //             },
    //             "Function": {
    //                 "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
    //             },
    //             "Boolean": {
    //                 "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
    //             },
    //             "Number": {
    //                 "message": "Avoid using the `Number` type. Did you mean `number`?"
    //             },
    //             "String": {
    //                 "message": "Avoid using the `String` type. Did you mean `string`?"
    //             },
    //             "Symbol": {
    //                 "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
    //             }
    //         }
    //     }
    // ],
    // "@typescript-eslint/dot-notation": "error",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/indent": "off",
    // "@typescript-eslint/member-delimiter-style": [
    //     "off",
    //     {
    //         "multiline": {
    //             "delimiter": "none",
    //             "requireLast": true
    //         },
    //         "singleline": {
    //             "delimiter": "semi",
    //             "requireLast": false
    //         }
    //     }
    // ],
    // "@typescript-eslint/naming-convention": "off",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/no-parameter-properties": "off",
    // "@typescript-eslint/no-shadow": [ //TODO this is pretty serious as it will confuse everyone
    //     "error",
    //     {
    //         "hoist": "all"
    //     }
    // ],
    // "@typescript-eslint/no-unused-expressions": "error", //TODO this is getting worse
    // "@typescript-eslint/no-use-before-define": "error",
    // "@typescript-eslint/prefer-for-of": "error",
    // "@typescript-eslint/quotes": "off",
    // "@typescript-eslint/semi": [
    //     "off",
    //     null
    // ],
    // "@typescript-eslint/type-annotation-spacing": "off",
    // "arrow-parens": [
    //     "off",
    //     "always"
    // ],
    // "brace-style": [
    //     "off",
    //     "off"
    // ],
    // "comma-dangle": "off",
    // "complexity": "error",
    // "dot-notation": "error",
    // "eol-last": "error", // TODO about 50 failures
    // "guard-for-in": "error", // TODO this seems important, currently failing in about 20x files
    // "id-denylist": [
    //     "error",
    //     "any",
    //     "Number",
    //     "number",
    //     "String",
    //     "string",
    //     "Boolean",
    //     "boolean",
    //     "Undefined",
    //     "undefined"
    // ],
    // "import/no-internal-modules": "error",
    // "indent": "off",
    // "jsdoc/check-alignment": "error",
    // "jsdoc/check-indentation": "error",
    // "jsdoc/newline-after-description": "error",
    // "max-classes-per-file": [
    //     "error",
    //     1
    // ],
    // "max-len": [
    //     "error",
    //     {
    //         "code": 120
    //     }
    // ],
    // "newline-per-chained-call": "off",
    // "no-console": [
    //     "warn",
    //     {
    //         "allow": [
    //             "warn",
    //             "dir",
    //             "timeLog",
    //             "assert",
    //             "clear",
    //             "count",
    //             "countReset",
    //             "group",
    //             "groupEnd",
    //             "table",
    //             "dirxml",
    //             "error",
    //             "groupCollapsed",
    //             "Console",
    //             "profile",
    //             "profileEnd",
    //             "timeStamp",
    //             "context"
    //         ]
    //     }
    // ],
    // "no-empty-function": "off", // TODO there are actually a lot of these, mostly for dialogs
    // "no-eval": "error", // TODO just in calculators
    // "no-irregular-whitespace": "off",
    // "no-multiple-empty-lines": "off",
    // "no-shadow": "error", //Closer but I think this could be fixable now
    // "no-trailing-spaces": "off",
    // "no-underscore-dangle": "warn", //not sure how doable this will be to use
    // "no-unused-expressions": "error",
    // "no-use-before-define": "error", //TODO getting closer
    // "object-shorthand": "error",
    // "padded-blocks": [
    //     "off",
    //     {
    //         "blocks": "never"
    //     },
    //     {
    //         "allowSingleLineBlocks": true
    //     }
    // ],
    // "prefer-const": "error",
    // "quote-props": "off",
    // "quotes": "off",
    // "react/jsx-curly-spacing": "off",
    // "react/jsx-equals-spacing": "off",
    // "unused-imports/no-unused-vars": [
    // 	"warn",
    // 	{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    // ],
    // "react/jsx-no-bind": "error", // TODO this is a performance culprit
    // "react/jsx-tag-spacing": [
    //     "off",
    //     {
    //         "afterOpening": "allow",
    //         "closingSlash": "allow"
    //     }
    // ],
    // "react/jsx-wrap-multilines": "off",
    // "semi": "warn", //TODO this needs to be done but there are a lot of these.
    // "space-before-function-paren": "error", // TODO this should get fixed by prettier
    // "space-in-parens": [
    //     "off",
    //     "never"
    // ],
    // "spaced-comment": [
    //     "error",
    //     "always",
    //     {
    //         "markers": [
    //             "/"
    //         ]
    //     }
    // ],
    // "unicorn/prefer-ternary": "error",
    // "no-unused-vars": "warn", // or "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/tslint/config": [
    //     "error",
    //     {
    //         "rules": {
    //             "jsx-no-string-ref": true,
    //             "prettier": true
    //         }
    //     }
    // ]
  }
}

