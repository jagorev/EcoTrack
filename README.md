<a id="top"></a>

# EcoTrack

<p align="center">
  <a href="https://github.com/jagorev/EcoTrack/graphs/contributors"><img src="https://img.shields.io/github/contributors/jagorev/EcoTrack?style=for-the-badge" alt="Contributors" /></a>
  <img src="https://img.shields.io/github/last-commit/jagorev/EcoTrack?style=for-the-badge" alt="Last commit" />
  <img src="https://img.shields.io/github/repo-size/jagorev/EcoTrack?style=for-the-badge" alt="Repository size" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/mobile-Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
  <img src="https://img.shields.io/badge/backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js and Express" />
  <img src="https://img.shields.io/badge/database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/auth-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/API-OpenAPI%20%7C%20Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="OpenAPI and Swagger" />
</p>

> A smart waste-management system for the city of Trento: a mobile app for citizens and a web app for the municipality, built to make waste collection more efficient and more sustainable.

<p align="center">
  <img src="Deliverables/imgs/Logo%20-%20EcoTrack.png" alt="EcoTrack logo" width="220" />
</p>

<details>
<summary><h2>Table of Contents 📖</h2></summary>

- [Overview](#overview)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Documentation](#documentation)
- [Getting started](#getting-started)
- [Project status](#project-status)
- [Team](#team)
- [Useful links](#useful-links)

</details>

## Overview

EcoTrack connects citizens and the municipality around waste collection. Citizens see how full the bins are and report abandoned waste. The municipality gets a dashboard with statistics and the reports to handle.

It is a University of Trento team project, developed with an agile process and documented through four deliverables (requirements, design, backlogs and testing).

## Key features

- **Interactive map:** live fill level of bins and collection points, including temporary ones.
- **Reports:** citizens report abandoned waste and attach photos so the right team can intervene.
- **Bookings:** citizens can book a waste disposal slot at an ecocentre.
- **Notifications:** reminders for door-to-door collection and alerts about bin status.
- **Admin dashboard:** the municipality monitors statistics and manages reports, ecocentres, bookings and users.

## Tech stack

| Layer | Technology |
| --- | --- |
| Mobile app | Flutter |
| Web app | HTML, CSS and vanilla JavaScript |
| Backend | Node.js with Express |
| Database | MongoDB with Mongoose |
| Authentication | Firebase, including third-party sign-in |
| API documentation | OpenAPI with Swagger |
| Testing | Jest and Supertest |
| External services | Google Maps API, Render for hosting |

## Project structure

```text
.
+-- app/              # Flutter mobile app (map, sign-in, profile, collection reminders)
+-- public/           # Municipality web app (dashboard, statistics, management pages)
+-- routes/           # Express routes (REST API)
+-- models/           # Mongoose models
+-- swagger/          # OpenAPI specification and build script
+-- tests/            # Jest API tests
+-- Deliverables/     # Project documents (LaTeX sources and PDFs) and pitch
+-- apk mobile app/   # Android release build
`-- index.js          # Backend entry point
```

## Documentation

Four deliverables describe the project from requirements to testing. The PDFs are in [`Deliverables/PDFs Deliverable`](Deliverables/PDFs%20Deliverable).

| Deliverable | Content |
| --- | --- |
| D1 | Goals, actors, functional and non-functional requirements, use cases |
| D2 | Component diagram, class diagram, OCL constraints |
| D3 | Product backlog and sprint planning |
| D4 | Second sprint, deployment diagram and testing |

The pitch is in [`Deliverables/pitch`](Deliverables/pitch), and the API is documented on [SwaggerHub](https://app.swaggerhub.com/apis-docs/universityoftrento/EcoTrackAPI/1.0.0).

## Getting started

Requirements: Node.js, a MongoDB database and a Firebase project.

```bash
git clone https://github.com/jagorev/EcoTrack.git
cd EcoTrack
npm install
```

Configure the environment variables in a `.env` file and the Firebase credentials, then:

```bash
node index.js         # start the backend
npm test              # run the API tests
npm run build:swagger # regenerate the OpenAPI documentation
```

You can also try the hosted [web app](https://ecotrack-6pp4.onrender.com/) or install the Android build from `apk mobile app/`.

## Project status

EcoTrack is a student project. Some features are implemented and others are still in progress.

## Team

| Member | GitHub |
| --- | --- |
| Giulio Gualtiero | [@giuliogualtiero](https://github.com/giuliogualtiero) |
| Jago Revrenna | [@jagorev](https://github.com/jagorev) |
| Tommaso Onori | [@tommasoonori](https://github.com/tommasoonori) |

## Useful links

- [Web app](https://ecotrack-6pp4.onrender.com/)
- [API documentation (SwaggerHub)](https://app.swaggerhub.com/apis-docs/universityoftrento/EcoTrackAPI/1.0.0)
- [Project documentation on Overleaf](https://www.overleaf.com/read/xnqzkypzjdst#7024a7)

<p align="center">
  <a href="#top" style="text-decoration: none;">
    <img src="https://img.icons8.com/ios-filled/50/000000/up.png" alt="Back to Top" width="40" height="40"/>
    <br>
    <strong>Back to Top</strong>
  </a>
</p>
