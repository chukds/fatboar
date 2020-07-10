# ADOFTB

> This is the F19 final project built with [AdonisJS](https://adonisjs.com/). It uses **AdonisJS v4.1**.

## Setup

Run the command below to install dependencies

```
npm install
```

### Environment variables

Duplicate `.env.example` in 2 files one named `.env` and rename it `.env.testing`

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
SMTP_HOST=smtp.mailtrap.io
MAIL_USERNAME=
MAIL_PASSWORD=
FB_CLIENT_ID=
FB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
HASH_DRIVER=bcrypt
SESSION_DRIVER=cookie
```

Enter the following in `.env.testing` file

```
HOST=localhost
PORT=4000
NODE_ENV=testing
DB_CONNECTION=sqlite
DB_DATABASE=adotest
```

Run this command to generate a key for the app.

```
adonis key:generate
```

Run the following command to run migration.

```
adonis migration:run
```

Seed the database:

```
adonis seed
```

To run the tests:

```
adonis test
```

Finally, start the application:

```
adonis serve --dev
```
