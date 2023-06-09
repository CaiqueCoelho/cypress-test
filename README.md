# [Cypress Ultimate Example]

The frontend test was done using the framework Cypress with Javascript, testing an application built in VUE that is a [medium.com](http://medium.com) clone. You can find the repository here https://github.com/gothinkster/vue-realworld-example-app

In our cypress tests, we have user de library [fakerjs](https://www.npmjs.com/package/@faker-js/faker) to help us generate random values for our e-mails, username, and article texts. Also, we have user Mochawesome to generate our report HTML and host them on Github artifacts after executing our tests with GitHub Actions.

To handle the login flow in the article tests flow we have user Cypress Session.

In the reports hosts in the Github you can find the HTML report, with screenshots when the test failed, and the video of the execution of the tests.

With the tests automated in the GHA pipeline, we can execute our tests every time a pull request is opened to our project to assure everything still works like expected and block the Pull Request from being merged if any tests failed

We can also execute the tests manually by the workflow dispatch in the following link by clicking in the [following link](https://github.com/CaiqueCoelho/cypress-test/actions/workflows/e2e.yml) on Run Workflow in the gray box and on the Run Workflow green button

https://github.com/CaiqueCoelho/cypress-test/actions/workflows/e2e.yml

## About the test

For this activity, was automated 4 flows:

- User Registration
- User login
- Creating a new article
- Editing an existing article
- Deleting an article

in the frontend activity, for all paths, I’ve decided to create an automation for the happy path(the successful flow) and another test to cover an alternative path, with the exception of Editing and Deleting an article which I wrote only the happy way:

- User Registration
  - Successful flow
  - Try to create a user with the same e-mail and username already registered
- User login
  - Successful flow
  - Try to log in with incorrect credentials
- Creating a new article
  - Successful flow
  - Try to create an article with an empty title
  - Try to create an article with an already published article title
- Editing an existing article
  - Successful flow
- Deleting an article

You can find all tests in the path [/cypress/e2e](https://github.com/CaiqueCoelho/cypress-test/tree/main/cypress/e2e)

## How to run the frontend application to be testes

```bash
# install editorconfig globally
> npm install -g editorconfig
```

The stack is built using [vue-cli webpack](https://github.com/vuejs-templates/webpack) so to get started all you have to do is:

```bash
# install dependencies
> yarn install
# serve with hot reload at localhost:8080
> yarn serve
```

Other commands available are:

```bash
# build for production with minification
yarn run build

# run unit tests
yarn test
```

If you are getting the error error ERR_OSSL_EVP_UNSUPPORTED, make sure you are in node version 16.13.0
You can downgrade or upgrade to 16.13.0 using nvm

```bash
> nvm install 16.13.0
> nvm use 16.13.0
```

## How to run the Cypress tests locally

1. Starting running the project with

```bash
# install dependencies
> yarn install
# serve with hot reload at localhost:8080
> yarn serve
```

2. In another terminal open cypress with `npx cypress open` or run cypress headless with `yarn e2e:tests`

## How to run the Cypress tests in GHA

Go to https://github.com/CaiqueCoelho/cypress-test/actions/workflows/e2e.yml and click in the gray button called Run Workflow and in the green button
called Run Workflow, the jib will start and you will be able to see all the steps running include the test and you can download the report in the end
of the job execution in the Summary of the job action in the Artifacts section like the following example https://github.com/CaiqueCoelho/cypress-test/actions/runs/5222923206

## Tests report from the Cypress execution

https://github.com/CaiqueCoelho/cypress-test/suites/13493899230/artifacts/741135272

## Tests videos from the Cypress execution

[Watch the video from Signing and Signup flow](https://github.com/CaiqueCoelho/cypress-test/raw/main/cypress/TestReport/videos/Signin%26Signup.cy.js.mp4)
[Watch the video from Article flow](https://github.com/CaiqueCoelho/cypress-test/raw/main/cypress/TestReport/videos/ArticleFlow.cy.js.mp4)
