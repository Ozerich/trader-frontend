# Этап 1: сборка приложения
FROM node:22 AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем React-приложение
RUN npm run build

# Этап 2: запуск через nginx
FROM nginx:alpine

# Копируем собранное приложение в папку, обслуживаемую nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем nginx-конфиг (опционально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
