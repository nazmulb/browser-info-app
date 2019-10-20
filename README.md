# Browser Info App

[![GitHub Last commit](https://badgen.net/github/last-commit/nazmulb/browser-info-app)](https://github.com/nazmulb/browser-info-app)
[![GitHub commits](https://badgen.net/github/commits/nazmulb/browser-info-app)](https://github.com/nazmulb/browser-info-app/commits/master)
[![GitHub stars](https://badgen.net/github/stars/nazmulb/browser-info-app)](https://github.com/nazmulb/browser-info-app)

An application that will collect statistical information from browsers and store it to the back-end.

### Overview:

It consists of three components/microservices:
- Collector: data collection script, which will be placed on the websites.
- API: server for data storage and processing.
- UI: webserver interface providing statistics from the back-end.

I used `node.js`, `nestJS`, `typescript`, `typeorm`, `MySql`, `swagger`, `JWT`, `jest` & `supertest` for back-end API. And `Angular 7` & `bootstrap` for UI.

### Setup:

Please clone this repo and run the following commands:

```sh
git clone https://github.com/nazmulb/browser-info-app.git
cd browser-info-app && cd api
npm i
```

### Run API:

```sh
docker-compose up
```
### Add User:

Please open a new CLI tab and go to the `api` folder using `cd browser-info-app && cd api`.

Please run the following command to add a user in the database:

```sh
npm run db:add:user
```

### Run Tests:

```sh
npm run test:e2e
```

### Run Test Coverage:

```sh
npm run test:cov
```

### Run UI:

```sh
cd .. && cd ui
npm i
npm start
```

### Open your browser and use the below URL:
`http://localhost:4200`

### Run Collector:

Open different browser with the following page:

`collector/index.html`