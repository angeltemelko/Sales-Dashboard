# Sales-Dashboard
Administration dashboard to manage and see the sales of products. The Users can register and log in. Each user has its role, and each role has different
permissions. Based on the permissions and roles assigned, it can perform different actions.
<br/>

## Get Started

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/download) - Or any other code editor
- [Git](https://git-scm.com/downloads)

### 2. Installation

On the command prompt run the following commands:

```cmd
$ git clone https://github.com/angeltemelko/Sales-Dashboard.git
$ cd sales-dashboard
$ cp .env.example .env (edit it with your secret key and database information)
$ docker-compose up (before running docker, please modify the database credentials)
```

### 3. Usage

URL : http://localhost:3000/

Navigate to http://localhost:3000/swagger/ for the API documentation.

### 4. Technologies used in project

| Technology                                                   | Description                                     |
|--------------------------------------------------------------|-------------------------------------------------|
| [Express](http://expressjs.com/)                             | Web framework for Node.js                       |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)   | JSON Web Tokens ( jwt )                         |
| [Joi](https://www.npmjs.com/package/joi)                     | Object schema validation                        |
| [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) | API documentation                               |
| [swagger-ui](https://www.npmjs.com/package/swagger-ui)       | API documentation                               |
| [React](https://facebook.github.io/react/)                   | JavaScript library for building user interfaces |
| [Redux](http://redux.js.org/)                                | Predictable state container                     |
| [Bootstrap](https://getbootstrap.com/)                       | CSS framework                                   |
| [Redux Form](http://redux-form.com/8.3.0/)                   | Redux Form                                      |
| [React-Router](https://reacttraining.com/react-router/)      | Declarative routing for React                   |
| [Axios](https://github.com/mzabriskie/axios)                 | Promise based HTTP client                       |
| [dotenv](https://www.npmjs.com/package/dotenv)               | Environment configuration                       |
| [ESLint](http://eslint.org/)                                 | Code linting tool                               |
| [Prettier](https://www.npmjs.com/package/prettier)           | Code formatter                                  |
| [Docker](https://www.docker.com/)                            | Containerization tool                           |