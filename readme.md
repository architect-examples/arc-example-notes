# arc-example-notes

A demo note taking app with support for multiple users.

## Features demonstrated:

- [HTTP](https://arc.codes/guides/http) GETs and POSTs with different response codes
- [Sessions](https://arc.codes/guides/sessions) and related work like including sign up, log in, authenticating access to lambda routes, etc.
- [Data storage](https://arc.codes/guides/data)
- [Middleware](https://arc.codes/reference/middleware), including using middleware to control access to a route lambda.
- The [`shared` directory](https://arc.codes/guides/sharing-common-code), with carefully selected features like auth and response codes available to all our lambdas.
- [Helpers](https://arc.codes/reference/http-helpers) like `url` - ensures we map to the correct sandbox / testing / production URLs (before DNS is set up) 

## Usage

Open the .arc and modify the @static bucket names from 'arc-example-notes-staging' and 'arc-example-notes-production' to something else - [S3 buckets are global to AWS](https://arc.codes/reference/static)

    npm i
    npx sandbox

Then visit the URL presented.


