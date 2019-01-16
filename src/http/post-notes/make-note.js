let Hashids = require('hashids'),
  data = require('@architect/data'),
  log = console.log.bind(console),
  hashids = new Hashids()

async function makeNote(email, title, body) {
  // create the partition and sort keys
  let note = {
    email,
    title,
    body,
    noteID: hashids.encode(Date.now())
  }
  log(`Making a note with ${JSON.stringify(note, null, 2)}`)
  // save the note
  let result = await data.notes.put(note)
  return result
}

module.exports = makeNote
