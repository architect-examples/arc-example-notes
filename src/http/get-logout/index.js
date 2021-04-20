let arc = require('@architect/functions')

exports.handler = arc.http.async(logout)

// logout clears the session and redirects home
async function logout () {
  return {
    session: {},
    location: '/'
  }
}
