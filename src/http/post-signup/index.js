let arc = require('@architect/functions'),
  makePerson = require('./make-person.js'),
  log = console.log.bind(console),
  url = arc.http.helpers.url

require('@architect/shared/globals')

exports.handler = async function http(request) {
  let session = await arc.http.session.read(request)
  let person = await makePerson(request.body.email, request.body.password)
  session.person = person
  let cookie = await arc.http.session.write(session)
  return {
    cookie,
    status: MOVED_TEMPORARILY,
    location: url('/notes')
  }
}
