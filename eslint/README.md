# Eslint Overrides

## .eslintrc.graphql-override.json

Add this file to the `extends`-array inside the `.eslintrc.json` of your desired app/lib.
This configuration enables eslint for graphql-queries.

For example:

```json
{
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "extends": [
        "plugin:@nrwl/nx/angular",
        "plugin:@angular-eslint/template/process-inline-templates",
        "../../../../eslint/.eslintrc.graphql-overrides.json"
      ]
    }
  ]
}
```

## .eslint.angular-overrides.json

Add this file to the `extends`-array inside the `.eslintrc.json` of your desired app/lib.

This configuration disables some default unnecessary default eslint options provided by nx.

```json
{
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "extends": [
        "plugin:@nrwl/nx/angular",
        "plugin:@angular-eslint/template/process-inline-templates",
        "../../../../eslint/.eslintrc.angular-overrides.json"
      ]
    }
  ]
}
```
