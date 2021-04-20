let arc = require('@architect/functions')
let verify = require('./verify-password')

exports.handler = arc.http.async(login)

async function login (req) {

  let session = {}
  let person = await verify(req.body.email, req.body.password)
  if (!person) {
    session.attemptedEmail = req.body.email
  }
  else {
    session.person = person
  }

  return {
    session,
    location: person? '/notes' : '/login'
  }
}
