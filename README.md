<img src="assets/images/logo-small.png" alt="logo" height="100"/>

# Dicoogle website - backend

This repository holds the source code of the Dicoogle website backend. It provides the services to send the download link for the Dicoogle users and to forward contact questions to admins emails.

## Develop

### Requirements

Dicoogle website backend was built using NodeJS and integrating frameworks as Sequelize for database ORM and Express.js for spinning the HTTP server up. The database is supported by SQLite in a file named `db.sqlite3` by default. To develop, you will need the to install the following on your computer:

- Node.JS v14.10+

Clone this repository and navigate to the folder

```bash
$ git clone git@github.com:rlebre/dicoogle-website-server.git
$ cd dicoogle-website-server
```

### Install the dependencies

```bash
$ yarn
```

### Provide required environment variables

You may create a .env file in the repository directory with the following content (as an example):

```env
MAIL_USER="email"
MAIL_PW="password"
MAIL_PORT=25
MAIL_HOST=mail.ua.pt
RECAPTCHA_SECRET="google recaptcha secret"
ADMIN_EMAILS="emails@separated.by spaces@email.com"
APP_URL=https://www.dicoogle.com
```

### Start the app in development mode

```bash
$ yarn dev
```

# Contributing

This open source project is maintained by [Rui Lebre](http://www.ruilebre.com). Your contributions to the software are also welcome. For tech support, please prefer contacting the maintainers instead of creating an issue.

## Maintainers

- Rui Lebre - [@rlebre](https://github.com/rlebre)

## License

[GPL-3.0-only](https://spdx.org/licenses/GPL-3.0-only.html)
