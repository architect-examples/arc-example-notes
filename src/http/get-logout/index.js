let arc = require('@architect/functions')
let url = arc.http.helpers.url

require('@architect/shared/globals')

exports.handler = async function route(request) {
  let session = await arc.http.session.read(request)
  session.person = null
  let cookie = await arc.http.session.write(session)
  return {
    cookie,
    status: MOVED_TEMPORARILY,
    location: url('/')
  }
}
