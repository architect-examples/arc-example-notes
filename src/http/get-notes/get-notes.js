let data = require('@architect/data'),
  log = console.log.bind(console)

module.exports = async function getNotes(email) {
  let result = await data.notes.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  })

  log(`Searching for notes for "${email}". Found ${result.Count} results`)

  var notes = result.Items
  return notes
}
