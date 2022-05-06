# Enterprise Applicaiton Developement - Lab 4 - Designing a Login and Registration System using Redis

| Student Information |                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Number**          | C17730535                                                                                        |
| **Name**            | Conor Rogers                                                                                     |
| **Date**            | 6/5/2022                                                                                         |
| **GitHub Repo**     | [https://github.com/conrog/ead-lab-4-assignment](https://github.com/conrog/ead-lab-4-assignment) |

## Parts Complete

| Part                                                                                    | Complete? |
| --------------------------------------------------------------------------------------- | --------- |
| Development of the server with Node.js and Bootstrap                                    | Yes       |
| Implementation of the sessions with Redis                                               | Yes       |
| Implementation of the password using Bycript                                            | Yes       |
| Allow the user to modify the values (1 pts)                                             | Yes       |
| 2 Diagrams                                                                              | Yes       |
| Specification with screenshots of which parts have been accomplished and which have not | Yes       |

## Requirements

You need to have following softwares installed in your system.

- Node (v11.15.0 or higher)
- MongoDB
- Redis

## How to run

Clone the repository and switch to it using the terminal.

Install the node dependencies.

```
npm install
```

Change the config.json file according to your system configuration.

```
{
  "mongodbURL": "mongodb://localhost:27017/userDemo",
  "redisHost": "localhost",
  "redisPort": 6379,
  "sessionSecret": "some-secret-hash",
  "port": 3000,
  "env": "development"
}
```

Then run the application using the following command.

```
node app.js
```

Navigate your browser to `localhost:3000` to view the app.
