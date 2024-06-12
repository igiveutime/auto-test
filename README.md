# front-tests

Тестирование проводится инструментом playwright (https://playwright.dev)

## Требования
- lts/gallium (node v16.20.2, npm v8.19.4)
- yarn 1.22.19

## Установка зависимостей

```shell
yarn install --frozen-lockfile
yarn playwright install
```

## Запуск тестов

```yarn playwright test```

## Запуск конкретного теста в headed режиме с отладчиком
```yarn playwright test gtm:17 --project=chromium --debug```

`gtm:17` - имя файла в test/gtm.spec.ts, строка 17. нужно указать строку в которой находится вызов теста `test
('описание', () => { ... })`

`--project=chromium` - браузер, другие варианты: `firefox`, `webkit`

`--debug` - режим отладки 

## Переменные окружения

Для передачи основных параметров используются переменные окружения. Их можно указать в файле `.env`, 
пример в `.env.example` 

## Интеграция с CI
https://playwright.dev/docs/ci
