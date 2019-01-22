let arc = require('@architect/functions'),
  layout = require('@architect/shared/layout'),
  url = arc.http.helpers.url,
  static = arc.http.helpers.static

require('@architect/shared/globals')

exports.handler = async function http(req) {
  let state = await arc.http.session.read(req)

  var message = null
  if (state.attemptedEmail) {
    message = `Could not log in as ${state.attemptedEmail}`
  }

  var loggedInPage = `
    <body>
      <h2>You're already logged in!</h2>
        <p>
        <a href=${url('/notes')}>notes</a>
        <a href=${url('/logout')}>logout</a>
      </p>
    </body>`

  var notLoggedInPage = `
    <body class="signup-page dark">
      <form class="login" method="post" action=${url('/login')} >
      
        <a href="/"><img class="logo" src="${static('/images/logo.svg')}"/></a>

        <h2>Please log in below!</h2>	

        <div class="flash-message ${message ? '' : 'no-messages'}">${message || ''}</div>
    
        <div class="input-and-label">
          <input name="email" required="required" type="email" autocomplete="off" value="${state.attemptedEmail || ''}" placeholder="Email address" autofocus/>
          <label for="email">Email address</label>
        </div>
    
        <div class="input-and-label">
          <input name="password" required="required" type="password" autocomplete="off" placeholder="Password"/>
          <label for="password">Password</label>
        </div>
        
        <button type="submit">Log In</button>
    
      </form>

      <a href="${url('/signup')}">Sign up</a>

    </body>
  `
  let content = state.person ? loggedInPage : notLoggedInPage

  return {
    type: HTML,
    status: OK,
    body: layout(content, false)
  }
}
