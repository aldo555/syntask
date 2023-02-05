# syntask
The only productivity app that doesn't actually make you productive.

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
