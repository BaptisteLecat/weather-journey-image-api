<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This function managed the generations and location of the weather Journey Mobile App. The API can fetch the weather data from a location and generate a MidJourney Prompt with chatGPT

## How it works

```mermaid
graph TB;
    weather_journey_app[Weather Journey App] -->|User selects a location| generation_process[Initiate Generation Process]
    generation_process -->|API request| weather_journey_image_api[Weather Journey Image API]
    weather_journey_image_api -->|Fetch weather data & craft ChatGPT prompt| midJourneyPrompt[Create Generation Document in Firestore]
    midJourneyPrompt -->|Document creation triggers| cloudFunction[Cloud Function]
    cloudFunction -->|Function invokes| midJourney[MidJourney Bot]

    classDef classDefault fill:#fff,stroke:#333,stroke-width:1px;
    classDef classLink stroke:#333,stroke-width:1px;
    class weather_journey_app,generation_process,weather_journey_image_api,midJourneyPrompt,cloudFunction,midJourney classDefault;
    linkStyle default classLink;
```


## Installation

```bash
$ npm install
```

## Running the app

```bash

export NODE_ENV=development  

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy to GCP

```bash
# build
docker build -t europe-west1-docker.pkg.dev/weatherapp-journey/weather-generation-api/generation-api:0.0.1 --platform linux/amd64 .

# push
docker push europe-west1-docker.pkg.dev/weatherapp-journey/weather-generation-api/generation-api:0.0.1

# deploy
gcloud run deploy weather-generation-api \
    --image europe-west1-docker.pkg.dev/weatherapp-journey/weather-generation-api/generation-api:0.0.1 \
    --platform managed \
    --region europe-west1 \
    --allow-unauthenticated \
    --min-instances 1 \
    --max-instances 2 \
    --memory 512Mi \
    --cpu 1 \
    --port 3000 \
    --set-env-vars "OPENAI_API_KEY=" \
    --service-account=weather-generation-api-runner@weatherapp-journey.iam.gserviceaccount.com
```

## License

Nest is [MIT licensed](LICENSE).
