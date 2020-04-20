setup-api:
	@echo 'Setting up your backend!'
	cd api/ && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

setup-ui:
	@echo 'Setting up your frontend!'
	cd ui/ && yarn install

start-api:
	@echo 'Starting backend!'
	cd api/ && flask run --no-debugger

start-ui:
	@echo 'Starting frontend!'
	cd ui/ && yarn start

test-api:
	@echo 'Running tests..'
	cd api/ && source venv/bin/activate && nosetests --verbosity=2 test_api

test-ui:
	@echo 'Running tests..'
	cd ui/ && yarn test
