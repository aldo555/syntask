# Syntask
The only productivity app that doesn't actually make you productive.

[![Netlify Status](https://api.netlify.com/api/v1/badges/0e7e7763-c20c-48d7-8c0d-79f3f4906011/deploy-status)](https://app.netlify.com/sites/deft-empanada-3f34c7/deploys)
[![Laravel Forge Site Deployment Status](https://img.shields.io/endpoint?url=https%3A%2F%2Fforge.laravel.com%2Fsite-badges%2F3d87cc1a-38bb-4c43-9558-75ef59cce283%3Fdate%3D1&style=flat)](https://forge.laravel.com)

## Setting up the backend

Head over to the backend folder and install composer dependencies
```
cd backend
composer install
```

Setup configuration
```
cp .env.example .env
```

Generate application key
```
php artisan key:generate
```

Create an SQLite database. This is for convenience purposes, you can also use another database (MySQL, Postgres), simply update your configuration accordingly.
```
touch database/database.sqlite
```

Run database migration
```
php artisan migrate
```

Run the dev server
```
php artisan serve
```

## Setting up the frontend

Get out of the backend folder and over to the frontend folder and install dependencied using the package manager of your choosing
```
cd frontend
pnpm install
```

Setup configuration
```
cp .env.example .env
```

Run dev
```
pnpm dev
```
