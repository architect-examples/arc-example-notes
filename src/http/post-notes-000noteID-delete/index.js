let arc = require('@architect/functions')
let requireLogin = require('@architect/shared/require-login')

exports.handler = arc.http.async(requireLogin, deleteNote)

async function deleteNote (req) {
  let data = await arc.tables()
  await data.notes.delete({
    noteID: req.params.noteID,
    email: req.session.person.email
  })
  return {
    location: '/notes'
  }
}
