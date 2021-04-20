let arc = require('@architect/functions')
let create = require('./create-person')

exports.handler = arc.http.async(signup)

async function signup (req) {
  let person = await create(req.body.email, req.body.password)
  return {
    session: { person },
    location: '/notes'
  }
}
