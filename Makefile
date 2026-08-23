install:
	npm ci
	npm ci --prefix frontend

lint:
	npm run lint --prefix frontend

build:
	npm run build --prefix frontend

start:
	npx start-server -s ./frontend/dist

start-frontend:
	npm run dev --prefix frontend

develop:
	make start & make start-frontend
