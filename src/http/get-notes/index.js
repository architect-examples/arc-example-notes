let arc = require('@architect/functions')
let layout = require('@architect/shared/layout')
let requireLogin = require('@architect/shared/require-login')
let getNotes = require('./get-notes.js')

exports.handler = arc.http.async(requireLogin, showProtectedPage)

// display all notes
async function showProtectedPage (req) {

  let person = req.session.person
  let notes = await getNotes(person.email)

  let greeting = `You don't have any notes! Make some below`
  if (notes.length) {
    greeting = `You have <strong>${notes.length}</strong> notes.`
  }

  let list = notes.map(note=> {
    return `
      <section class="card">
        <a href=/notes/${note.noteID}>        
          <heading>
            ${note.title}
          </heading>        
          <p>${note.body}</p>
        </a>
      </section>`
  })

  var contents = `
    <section>
      <h2>Welcome to the Notes page <strong>${person.email}</strong>!</h2>
      <p>${greeting}</p>
      <section class="cards">
        ${list.join('')}
      </section>
      <form action=/notes method=post>
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
    html: layout({ contents }),
  }
}

