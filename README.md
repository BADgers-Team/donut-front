# donut-front
Frontend repo for project Donating
### Доступ
- Деплой (To be continued...)
- [Бэкенд](https://github.com/BADgers-Team/donut-back) 
- API (To be continued...)
- Макеты (To be continued...)
- [RoadMap](https://miro.com/welcomeonboard/aOeOpUF6JGmCrk0bvfZtKc2rBcYXIAlqgJ4zSUyksQ3ahCqhdZwt72D6hY539utF)
- [UserFlow](https://app.flowmapp.com/projects/119316/userflow/75183/)
- Опрос и результаты (To be continued...)
### Установка и запуск  
- `npm i`
- `npm start` запуск проекта в режиме разработки (поднимается на http://localhost:3001)
- `npm run build` запуск продакшен-версии (статика)
- `npm run linter`/`npm run linter-fix` запуск линтера
### Структура проекта  
- `src` - все ресурсы для разработки
- `src/components` - компоненты, используемые в построении дерева
- `src/components/app` - главный компонент-контейнер
- `src/components/layouts` - контейнеры-страницы
- `src/components/blocks` - компоненты-блоки, из которых формируются страницы (пр. навбар, таблица, футтер)
- `src/components/fragments` - элементарные компоненты (пр. кнопки, селект-листы, чекбоксы)
- `src/services` - все вспомогательные модули (пр. модуль для похода в сеть, хелперы)
- `src/store` - константы
### Дополнительно
Есть файл .nvmrc, в котором записана текущая версия Node.js, с которой работает проект. Для корректной работы с этим файлом (если вам нужно) надо установить nvm, а затем `nvm use <указанная версия>`. Проверить корректность установки можно с помощью команды `nvm current`

В режиме разработки проект поднимается на порту **3001**. Чтобы поднять его на своем порту, нужно передать параметр в переменную окружения npm. Пример для порта 4000:
`PORT=4000 npm start`
