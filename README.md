# Cloud Humans Backend Test

## Usage Instructions

This project requires Node.js>=15 and npm>=7 to work properly.

After cloning it, open a terminal shell inside the recently cloned directory and run:

    npm install 

When the dependencies installation is completed, there are two commands available, which should both be run from within
the directory of the project:

    npm run dev
    npm run test
    
`npm run dev` will start the server at `http://localhost:SERVER_PORT`, being the `SERVER_PORT` the one configured in the
`.env` file or `5000` as default.

`npm run test` will run the automated test suites which were developed, and will print out both the code coverage of the
tests, as well as which ones passed and which failed.

When the server is properly started, there is only one endpoint which is being exposed in order to evaluate a Pro's
profile. Sending a `POST` request to `http://localhost:SERVER_PORT/profiles/evaluate` with the appropriate body will
start the evaluation of the provided information, and will return a `200` response with the score and eligible projects
when the Pro is over 18 and provides the correct set of informations, or a `400` response with the appropriate error
messages.

## Main Technical Decisions

ExpressJS was chosen as the project's base framework in order for the project to be as simple as possible, while
maintaining a high extensibility. Typescript was chosen as the project's programming language for the same reason - it
keeps the simplicity of JavaScript while providing tools that help the development of large code bases.

As for the structure of the API code, it was chosen to follow an MVC model for it's robustness and widespread knowledge
and adoption.

Finally, Jest was chosen as the project's test tool because of it's implementation simplicity as well as good range of 
usages - it can be used both as a unit test tool, as well as integration test tool.

## Other Relevant Comments

While an integration with a database wasn't necessary in this first moment, it was decided to already provide a service
structure which can, in the future, be changed in order to consume data from a proper DB.
