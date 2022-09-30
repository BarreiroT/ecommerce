# App to try Mobbex

The idea behind this app was to create a front-end and a back-end to try an integration with Mobbex and be able to extend it in the future.

This app includes a react app made with Vite where you can create orders and pay them and an express app that uses PostgreSQL as a database for those orders.
Both of them with TypeScript.

The decision behind the express app was to have an Application class that contains the use cases and calls the systems. These systems have the required logic and interact with the persistence layer.
Every controller then calls a function of the Application and, as a design decision, they receive validated data.

The current cloud infrastructure includes a CloudFront with two origins: an s3 that serves the react app and uses CloudFront Cache and the API that lives inside an ec2 instance. The database instance is in AWS RDS.
