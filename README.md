# TaskLab

Tasklab is a project management system that allows users to sign in, create groups for projects. They can
add new projects, view task deliverables and timeline, assign user tasks, create reminders, chat,
add notes and to-do and more. The intended users are anyone who would want to use a project
management system in order to track project progress and manage team members.

## Table of Content
* [How to run](#how-to-run)

* [Technologies](#technologies)

*  [Sources](#sources)

*  [License](#license)

## <div id="how-to-run"> How to Run </div>

### Prerequisites
  * Postgresql - Install [here](https://www.postgresqltutorial.com/install-postgresql)
  * NodeJS - Download and Install [here](https://nodejs.org/en/download/)

First clone project and install dependencies
```shell script
$ git clone https://github.com/TaskLab-CS375/TaskLab.git
$ npm install
```

Next to set up Postgresql, you need login first with psql. Then run the following commands
```shell script
postgres=# CREATE DATABASE tasklab;

CTRL-C to get back to normal prompt
$ psql -f db_setup.sql tasklab
```

After all that, run
```shell script
$ npm run dev
```
which will build the project and run the Express server at http://127.0.0.1:3000.

## <div id="technologies"> Technologies </div>

  * ExpressJS
  * ReactJS
  * AWS
  * Docker
  * Postgresql
  

## <div id="sources"> Sources </div>

  * https://daveceddia.com/deploy-react-express-app-heroku/
  * https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
  
## <div id="license"> License </div>

  

+  [MIT](https://choosealicense.com/licenses/mit/)