let arc = require('@architect/functions'),
  layout = require('@architect/shared/layout'),
  requireLogin = require('@architect/shared/require-login'),
  data = require('@architect/data'),
  url = arc.http.helpers.url

require('@architect/shared/globals')

async function showNote(request) {
  let noteID = request.params.noteID

  let session = await arc.http.session.read(request)

  let email = session.person && session.person.email

  let note = await data.notes.get({noteID, email})
  note.noteURL = url(`/notes/${noteID}`)

  let showNote = function(note) {
    return `
      <article>
        <h2>Edit note</h2>
        <form action=${note.noteURL} method=post>
            <input type=hidden name=noteID value=${noteID}>
          <div class="input-and-label">
            <input 
            type=text 
            name=title 
            placeholder="Enter title" 
            value="${note.title}"
            required>
          </div>
          <div class="input-and-label">
            <textarea 
            class=form-control 
            name=body 
            placeholder="Enter text">${note.body}
            </textarea>
          </div>
          <button type=submit>Save changes</button>
        </form>

        <form action="${note.noteURL}/delete" method=post>
          <button class="danger" type=submit>Delete</button>
        </form>

      </article>
    `
  }

  return {
    status: OK,
    body: layout(showNote(note)),
    type: HTML
  }
}

exports.handler = arc.middleware(requireLogin, showNote)
