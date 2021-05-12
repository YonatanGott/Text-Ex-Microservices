# Text-Ex-Microservices

A Textbook Exchange Platform

## Microservice Application
Each service is created using Node.JS and Express, written with Typescript. Data for each service is held in either a MongoDB database or Redis. 
The frontend is built in Next.JS (SSR) with Stripe for online payment processing and Chakra UI for styling.
The multi-service application runs in Docker containers executed in a Kubernetes cluster with ingress-nginx and NATS event-bus. 
