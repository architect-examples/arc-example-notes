let arc = require('@architect/functions'),
  layout = require('@architect/shared/layout'),
  requireLogin = require('@architect/shared/require-login'),
  getNotes = require('./get-notes.js'),
  log = console.log.bind(console),
  url = arc.http.helpers.url

require('@architect/shared/globals')

async function showProtectedPage(request) {
  log(`Showing notes`)
  let state = await arc.http.session.read(request)

  var notes = await getNotes(state.person.email)

  var greeting = `You don't have any notes! Make some below`
  if (notes.length) {
    greeting = `You have <strong>${notes.length}</strong> notes.`
  }

  var existingNotes = ``
  notes.forEach(function(note) {
    var noteURL = url(`/notes/${note.noteID}`)
    existingNotes += `
      <section class="card">
        <a href="${noteURL}">        
          <heading>
            ${note.title}
          </heading>        
          <p>${note.body}</p>
        </a>
      </section>`
  })

  var contents = `
    <section>
      <h2>Welcome to the Notes page <strong>${state.person.email}</strong>!</h2>
      <p>${greeting}</p>

      <section class="cards">

        ${existingNotes}
      </section>

      
      <form action=${url('/notes')} method=post>
        <h2>Make a note</h2>
        <div class="input-and-label">
          <input name="title" required="required" type="text" autocomplete="off" value="" placeholder="Title" autofocus/>
          <label for="email">Title</label>
        </div>
        <div class="input-and-label">
          <textarea name="body" required="required" autocomplete="off" value="" placeholder="Body text"></textarea>
          <label for="body">Body</label>
        </div>
        <button>Make a note</button>
      </form>
    </section>
    
  `

  return {
    status: OK,
    body: layout(contents, true, true),
    type: HTML
  }
}

exports.handler = arc.middleware(requireLogin, showProtectedPage)
