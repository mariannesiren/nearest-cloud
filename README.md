# Nearest cloud

To run this project you will need

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Python 3](https://www.python.org/)
- [Just](https://github.com/casey/just)

Steps to get project running:

1. Clone repo
2. Navigate to root folder
3. Ensure you have Just installed by running `just --version`
4. Run `just setup-ui` and `just setup-api`
5. Run `just start-api`, open another window and run `just start-ui`

(If you don't want to use Just, you can enter commands defined in the Justfile manually too)

To run tests, run:

- `just test-ui`
- `just test-api`
