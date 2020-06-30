# ADOFTB

> This is the F19 final project built with [AdonisJS](https://adonisjs.com/). It uses **AdonisJS v4.1**.

## Setup

Run the command below to install dependencies

```bash
$ npm install
```

### Environment variables

Duplicate `.env.example` and rename it `.env`

### Migrations

To setup your database. Create 2 database files in the database folder one called `adonis.sqlite` and the other `adotest.sqlite`

To setup e-mail functionality you can create a [Mailtrap](https://mailtrap.io/) account. From the Mailtrap settings you can copy the port, username and password.

Enter the following in `.env` file

```
HOST=localhost
PORT=8000
NODE_ENV=development
APP_NAME=adoftbii
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=
DB_CONNECTION=sqlite
DB_DATABASE=adonis
HASH_DRIVER=bcrypt
SMTP_HOST=smtp.mailtrap.io
MAIL_USERNAME=
MAIL_PASSWORD=
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

Enter the following in `.env` file

```
HOST=localhost
PORT=4000
NODE_ENV=testing
DB_CONNECTION=sqlite
DB_DATABASE=adotest
```

Run this command to generate a key for the app.

```bash
$ adonis key:generate
```

Run the following command to run migration.

```bash
$ adonis migration:run
```

Seed the database:

```bash
$ adonis seed
```

Finally, start the application:

```bash
$ adonis serve --dev
```
