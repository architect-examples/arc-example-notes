# arc-example-notes

A demo note taking app with support for multiple users.

## Features demonstrated:

- Accessible `GET` and `POST` based multipage app
- Secure sessions including sign up, login and authorizing routes
- Data persistence using DynamoDB
- Middleware to control access to a route with `arc.http.async`
- The [`shared` directory](https://arc.codes/docs/en/guides/developer-experience/sharing-code) for layout and auth shared between Lambdas

## Usage

```bash
npm i
npm start
```

Then visit the URL presented.
