### Hexlet tests and linter status:
[![Actions Status](https://github.com/mikitasazan/js-react-development-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mikitasazan/js-react-development-project-12/actions)

# Hexlet Chat

Упрощённая версия Slack: каналы, сообщения в реальном времени, регистрация и вход.

## Стек

React 19, Vite, Mantine, Zustand, TanStack Query, React Router, socket.io-client, i18next, axios.

## Запуск

```bash
make install
make build
make start
```

Приложение открывается на `http://localhost:5001`.

Для разработки бэкенд и фронтенд поднимаются отдельно:

```bash
make start
make start-frontend
```

Фронтенд разработки живёт на `http://localhost:3000` и проксирует `/api` и `/socket.io` на порт 5001.
