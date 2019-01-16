let arc = require('@architect/functions'),
  requireLogin = require('@architect/shared/require-login'),
  url = arc.http.helpers.url,
  data = require('@architect/data'),
  log = console.log.bind(console)

require('@architect/shared/globals')

let editNote = async function route(request) {
  try {
    let session = await arc.http.session.read(request)
    // get the note (including title, body and noteID) from the form post
    let note = request.body
    // create the partition and sort keys
    note.email = session.person && session.person.email
    // save the updated note
    log(`Saving ${JSON.stringify(note, null, 2)}`)
    let result = await data.notes.put(note)
    log(result)
  } catch (error) {
    log(error)
  }
  return {
    status: MOVED_TEMPORARILY,
    location: url('/notes')
  }
}

exports.handler = arc.middleware(requireLogin, editNote)
