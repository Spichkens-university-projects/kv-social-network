# Для запуска приложения

1. Убедиться в наличии установленных зависимостей
  * [NodeJs](https://nodejs.org/en)
  * [NestJs](https://docs.nestjs.com/)
  * [Git](https://git-scm.com/)

2. Склонировать репозиторий

```bash
# клонирование
git clone https://github.com/Spichkens-university-projects/social-v2.git

# переход в директорию проекта
cd social-v2
```

3. Убедиться в запуске [Docker контейнера](https://github.com/Spichkens-university-projects/social-v2/blob/main/docker-compose.yml)

4. Запустить приложение

```bash
# установка зависисмостей
npm i

# dev mode
npm run start:dev

# prod mode
npm run build && npm run start
```

4. Перейти на [localhost:3001](http://localhost:3001/api), чтобы увидеть документацию
