let arc = require('@architect/functions'),
  data = require('@architect/data'),
  url = arc.http.helpers.url,
  requireLogin = require('@architect/shared/require-login'),
  log = console.log.bind(console)

let deleteNote = async function route(request) {
  let noteID = request.params.noteID
  let session = await arc.http.session.read(request)
  let email = session.person && session.person.email
  log(
    `Deleting notes matching ${JSON.stringify(
      {
        noteID,
        email
      },
      null,
      2
    )}`
  )
  await data.notes.delete({
    noteID,
    email
  })
  return {
    status: MOVED_TEMPORARILY,
    location: url('/notes')
  }
}
exports.handler = arc.middleware(requireLogin, deleteNote)
