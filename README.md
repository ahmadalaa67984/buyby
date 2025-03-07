# Buy-by Server

## Requirements

- Node.js v16.13.0
- npm v7.24.0

## Installation

1. Clone the repository:
   `https://github.com/pharaohsoft/buyby-server.git`

```bash
$ git clone https://github.com/pharaohsoft/buyby-server.git
```

2. Install the dependencies:

```bash
$ cd buyby-server
$ npm install
```

## Running the app

- copy .env.example and rename it to .env.development
- replace environment variables values with you values
- Configure the database: Update the database environment variables with your database credentials.
- Configure the AWS: Update the S3 BUCKET environment variables with your AWS configuration.
- Configure a web service at firebase: Update the firebase environment variables with your configuration.

1. Development mode

```bash
$ cp .env.example .env.development

# development
$ npm run start

# watch mode
$ npm run start:dev
```

2 - production mode

```bash
$ cp .env.example .env.production

# build app
$ npm run build

# production mode
$ npm run start:prod
```
