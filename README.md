# Aiven Nearest cloud project

To run this project you will need:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Python 3](https://www.python.org/)

Steps to get project running:

1. Clone repo
2. Navigate to project root folder
3. Setup backend with this command:
   `cd api/ && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
4. Ensure you are in root/api -folder and you have `(venv)` text visible in your terminal. Start backend with `flask run --no-debugger`
5. Open new terminal window and locate to project root folder (you probably are in root/api -folder) with `cd ..`
6. Setup frontend with `cd ui/ && yarn install`
7. Ensure you are in root/ui -folder and start ui with `yarn start`

To run tests, run in project root:

- `cd ui/ && npx jest`
- `cp api/ && source venv/bin/activate && nosetests --verbosity=2 test_api`
