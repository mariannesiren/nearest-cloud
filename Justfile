start-ui:
	@echo 'Starting frontend!'
	cd ui/ && yarn start
	
start-api:
	@echo 'Starting backend!'
	cd api/ && venv/bin/flask run --no-debugger