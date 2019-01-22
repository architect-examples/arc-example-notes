let arc = require('@architect/functions'),
  layout = require('@architect/shared/layout'),
  url = arc.http.helpers.url,
  static = arc.http.helpers.static

require('@architect/shared/globals')

exports.handler = async function http(req) {
  let state = await arc.http.session.read(req)

  if (state.person) {
    // You're already logged in
    return {
      status: MOVED_TEMPORARILY,
      location: url('/notes')
    }
  }

  var signupPage = `
    <body class="signup-page dark">
      <form class="signup" method="post" action=${url('/signup')}>
      
        <a href="/"><img class="logo" src="${static('/images/logo.svg')}"/></a>
        <h2>Sign up</h2>
        
        <p>Enter an email and password to sign up</p>
    
        <div class="input-and-label">
          <input name="email" required="required" type="email" autocomplete="off" value="" placeholder="Email address" autofocus/>
          <label for="email">Email address</label>
        </div>
    
        <div class="input-and-label">
          <input name="password" required="required" type="password" autocomplete="off" placeholder="Password"/>
          <label for="password">Password</label>
        </div>

        <div class="input-and-label checkbox">
          <input type="checkbox" required checked>
          <label for=tsandcs>Agree to the terms of conditions</label> 
        </div>

        <button type="submit">Sign up</button>
    
      </form>

      <a href="${url('/login')}">Log in</a>
    </body>
  `

  return {
    type: HTML,
    status: OK,
    body: layout(signupPage, false)
  }
}
