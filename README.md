# dtsgenerator-undefined-as-null

This is a `dtsgenerator` plugin.

Transform all the typescript optional fields to a union with the original type and `null` as members.

# Install

```
npm install dtsgenerator-undefined-as-null
```

# Usage

`dtsgen.json`
```json
{
    "plugins": {
        "dtsgenerator-optional-as-null": true // or { config object }
    }
}
```

# Configuration

<!-- If this plugin uses the config object this section is useful for plugin user. -->

- the type of configuration
```ts
type Config = {
  exclude: string[], // list of regex patterns of filenames to exclude
};
```

- Example
```json
{
  "exclude": [
    "Petstore",
    "(Corp|Internal)Api"
  ]
}
```

# Development

```
npm run build
npm test
```

## Stacks

- TypeScript
- eslint
- prettier

## Files

- `index.ts`: plugin main file
- `test/snapshot_test.ts`: test main file. should not edit this file.
- `test/post_snapshots/`: post process test patterns.

## npm scripts

### main scripts

- `npm run build`: transpile this plugin. This command need before publishing this plugin.
- `npm test`: test this plugin with coverage.
- `npm run clean`: remove all compiled files.

### sub scripts

- `npm run watch`: watch editing files for compile.
- `npm run lint:fix`: fix lint error automatically.
- `npm run test:update-snapshot`: update snapshot files for unit test.
- `npm run coverage`: report to [coveralls](https://coveralls.io/). Need coveralls configuration file.
