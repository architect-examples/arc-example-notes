let arc = require('@architect/functions')
let Hashids = require('hashids')
let hashids = new Hashids()

module.exports = async function save ({email, title, body}) {
  let data = await arc.tables()
  return data.notes.put({
    email,
    title,
    body,
    noteID: hashids.encode(Date.now())
  })
}
