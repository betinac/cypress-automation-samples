# Filter tests

I've implemented the `@bahmutov/cy-grep` plug-in that allows us to filter tests by tags or substrings included in the test title.

## Examples

### Using a substring within the test's title

To filter tests by certain words within the title or objective of the tests, run the following from the terminal:

- Only run the tests with "Schema" in the title (case sensitive):

```
npx cypress run --env grep="Schema"
```

- Only run the tests with "OrangeHR" **OR** "Schema" in the titles:

```
npx cypress run --env grep="OrangeHR; Schema"
```

### Using tags

To filter tests by certain tags that I've prefixed with `@`:

- Run the tests tagged `@mocked`

```
npx cypress run --env grepTags="@mocked"
```

- Run the tests tagged `@mocked` or `@contract`

```
npx cypress run --env grepTags="@mocked @contract"
```

- Run the tests tagged `@regression` or `@loginUI`, filter out tests not matching the criteria

```
npx cypress run --env grepTags='@loginUI --@regression',grepFilterSpecs=true
```
