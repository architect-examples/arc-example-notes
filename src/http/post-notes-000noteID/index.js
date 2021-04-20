let arc = require('@architect/functions')
let requireLogin = require('@architect/shared/require-login')

exports.handler = arc.http.async(requireLogin, edit)

async function edit (req) {

  // get the note (including title, body and noteID) from the form post
  let note = req.body
  note.email = req.session.person.email

  // save the updated note
  let data = await arc.tables() 
  await data.notes.put(note)

  return {
    location: '/notes'
  }
}

