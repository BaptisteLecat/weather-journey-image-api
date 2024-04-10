<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Weather Journey Image API is a RESTful API that generates images based on the weather conditions of a location. It uses the OpenAI API to generate images based on the weather conditions of a location. The API is built using NestJS and is deployed on Google Cloud Run.

## Requirements

This project requires the following:

- Google Cloud Platform account
- OpenAI API Key
- Firebase Admin SDK Key -> Firebase Auth and Firestore

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
    --set-env-vars "OPENAI_API_KEY=YOUR_KEY" \
    --service-account=weather-generation-api-runner@weatherapp-journey.iam.gserviceaccount.com
```
