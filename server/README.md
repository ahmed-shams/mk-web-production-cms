

## Getting Started

### start local dev DB
from project root run 
`docker-compose up -d` starts docker compose in daemon mode
`docker ps` view running docker processes and what ports they map to on your machine
when you're done or want to start clean `docker-compose down` stop mysql and adminer docker containers

*see* [docker-compose.yml](docker-compose.yml)
* mysql instance starts in docker container, container port 3306 is mapped to your localhost:3306
* adminer web UI for interacting with DB starts at localhost:8080
* change DB / auth config as needed
go here for more info https://medium.com/@chrischuck35/how-to-create-a-mysql-instance-with-docker-compose-1598f3cc1bee

*note*
for now you have to manually create the DB yourself the first time
TODO: automate this with docker compose script
* navigate to `localhost:8080`
* login with username: root password from here [docker-compose.yml](docker-compose.yml)
* click `create database` and create your db

### run the backend
`cd server` go to server directory
`npm i` install dependencies
`npm start` run development server on port 3001

hit `http://localhost:3001/api/file/nav` (or any route) to test the backend


## Scripts


## Deployement

Within the same AWS account each developer can have their own "sandbox" environment in addition to a "dev" environment. These environments can share one DB cluster (with one or multiple DBs or schemas). Currently this infra template only deploys one database instance. 

*developer scoped environments*

by default serverless will create a cloudformation stack called `sls-cms-server-app-dev`. If you set the environment variable DEV_NAME in your system it will deploy the stack `sls-cms-server-app-<DEV_NAME>`. Do this if you want your own stack independent form dev. 

*env vars*

By default when you run `npm run deploy` serverless framework will apply the environment configuration stored in [default.yml](../server/config/default.yml)

This happens because `deploy` runs the command `sls deploy --env_src=remoteEnv`. "env_src" is a custom cli flag (could be named anything), by passing it to `sls` commands the serverless.yml template will be evaluated accordingly 
https://serverless.com/framework/docs/providers/aws/guide/variables#referencing-cli-options

To configure your deployment do the following:    
* change [config/remoteEnv.sample.yml](config/remoteEnv.sample.yml) to remoteEnv.yml (now it is git ignored)
* fill in values accordingly 

when `sls offline` or `sls invoke` (or any sls command ) is run it will use /config/default.yml. Change the default values or create a new config file and pass its name to the cli to use it   
i.e. `sls deploy --env_src=<my-custom-config>`

*vpc config / rds setup*

since the lambda must connect to an RDS instance it is required to be in the same VPC as RDS instance 
more here:  https://docs.aws.amazon.com/lambda/latest/dg/services-rds-tutorial.html

for your deployment to work go to the bottom of the serverless.yml and fill in the securityGroupIds abnd subnets that match up with your RDS instance

*TODO automation*
the vpc + RDS can be created as part of the infrastrucutre as code document
the resulting resources such as DB host endpoint + security group ID can be dynamically referenced at deploy time using cloud formation intrinsic functions
or serverless framework syntax
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html

https://serverless.com/framework/docs/providers/aws/guide/variables#reference-cloudformation-outputs

automation guidelines:
https://serverless-stack.com/chapters/what-is-infrastructure-as-code.html

