# cypress-automation-samples

This is a Cypress repo where you can find several test examples and the automation testing strategy associated to them.

## How to run the tests

- To run your Cypress tests run: `npm exec cypress open`
- Before running the tests:
  - Add a new `cypress.env.json` file under the root folder and replace the variables with the credentials from your TestBench Cloud account.

_For example:_

```
//cypress.env.json file's content
{
  "email": "my-user",
  "password": "s3creT-p@ssw0rd"
}
```
