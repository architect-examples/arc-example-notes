let data = require('@architect/data'),
  bcrypt = require('bcrypt'),
  log = console.log.bind(console)

module.exports = async function authenticatePerson(email, suppliedPassword) {
  let result = await data.people.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  })
  log(`Searching for person "${email}" matching user-supplied password. Found ${result.Count} results`)
  if (result.Items.length) {
    let firstResult = result.Items[0]
    let person = firstResult
    let authorized = await bcrypt.compare(suppliedPassword, person.password)
    if (authorized) {
      // Remove the hashed password, as we don't want it in sessions (or anywhere else outside this module)
      delete person.password
      log(`Successful login as ${email}`)
      return person
    }
  }
  log(`Failed login attempt as ${email}`)
  return null
}
