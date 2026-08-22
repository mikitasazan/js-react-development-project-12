lint-frontend:
	make -C frontend lint

install:
	npm ci

build:
	npm run build

start:
	npm start

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start-full:
	make start-backend & make start-frontend
