let arc = require('@architect/functions'),
  log = console.log.bind(console),
  url = arc.http.helpers.url

require('@architect/shared/globals')

module.exports = async function requireLogin(request) {
  let state = await arc.http.session.read(request)

  if (!state.person) {
    console.log(`Attempt to access protected page without logging in!`)
    // Return a response, so middleware processing ends
    return {
      status: MOVED_TEMPORARILY,
      location: url(`/login`)
    }
  }
  console.log(`We're logged in as ${state.person.email}`)
  // return nothing, so middleware processing continues
}
