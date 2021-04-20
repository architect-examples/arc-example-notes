let arc = require('@architect/functions')
let bcrypt = require('bcrypt')

module.exports = async function authenticatePerson(email, suppliedPassword) {
  let data = await arc.tables()
  let result = await data.people.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  })
  if (result.Items.length) {
    let person = result.Items[0]
    let authorized = await bcrypt.compare(suppliedPassword, person.password)
    if (authorized) {
      // Remove the hashed password, as we don't want it in sessions (or anywhere else outside this module)
      delete person.password
      return person
    }
  }
}
