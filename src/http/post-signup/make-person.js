let data = require('@architect/data'),
  bcrypt = require('bcrypt'),
  log = console.log.bind(console)

const SALT_ROUNDS = 12

async function makePerson(email, suppliedPassword) {
  let hashedPassword = await bcrypt.hash(suppliedPassword, SALT_ROUNDS)
  let person = {email, password: hashedPassword}
  data.people.put(person)
  log(`Created person ${email}`)
  return person
}

module.exports = makePerson
