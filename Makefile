install:
	pnpm install

lint:
	pnpm run lint

build:
	pnpm run build

start:
	pnpm exec start-server -s ./frontend/dist

start-frontend:
	pnpm --dir frontend run dev

develop:
	make start & make start-frontend
