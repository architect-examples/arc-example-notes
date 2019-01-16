let arc = require('@architect/functions'),
  makeNote = require('./make-note.js'),
  requireLogin = require('@architect/shared/require-login'),
  url = arc.http.helpers.url

require('@architect/shared/globals')

async function route(request) {
  try {
    let session = await arc.http.session.read(request)

    // create the partition and sort keys
    let email = session.person.email
    // save the note
    let result = await makeNote(email, request.body.title, request.body.body)
    // log it to stdout
    console.log(result)
  } catch (error) {
    console.log(error)
  }
  return {
    status: MOVED_TEMPORARILY,
    location: url('/notes')
  }
}

exports.handler = arc.middleware(requireLogin, route)
