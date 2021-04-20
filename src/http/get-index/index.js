let arc = require('@architect/functions')
let layout = require('@architect/shared/layout')

exports.handler = arc.http.async(home)

async function home (request) {

  let state = await arc.http.session.read(request)
  let email = state.person && state.person.email

  let isLoggedIn = !!state.person

  var loggedInPage = `
    <section class="hero">
      <h1>Welcome back <strong>${email}</strong>!</h1>	
      <h2>You've logged in. That's so cool.</p>
      <p>Check your <a href=/notes>notes</a> or <a href=/logout>logout</a></p>   
    </hero>
  `

  var notLoggedInPage = `
    <section class="hero">
      <h1>Welcome to the Architect demo app!</h1>	
      <h2>It looks like it's your first time here. You should <a href=/signup>sign up</a> now!</p>
      <p>You can also try and visit <a href=/notes>Notes</a> or <a href=/login>Log in</a> but you'll need to sign up first.</a></p>   
    </hero>
  `
  let contents = isLoggedIn ? loggedInPage : notLoggedInPage

  return {
    html: layout({contents, isLoggedIn})
  }
}
