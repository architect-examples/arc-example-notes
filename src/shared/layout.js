let arc = require('@architect/functions'),
  stylesheet = arc.http.helpers.static('/css/style.css'),
  url = arc.http.helpers.url,
  static = arc.http.helpers.static

module.exports = function layout(contents, showNav = true, isLoggedIn = true) {
  var nav = ''

  var loginLinks = `
		<a class="button subtle" href="${url('/login')}">Log in</a>
		<a class="button" href="${url('/signup')}">Sign up</a>
	`
  if (isLoggedIn) {
    loginLinks = `
			<a class="button subtle" href="${url('/logout')}">Log out</a>
		`
  }

  if (showNav) {
    nav = `
			<nav>
				<a href="/"><img class="logo" src="${static('/images/logo.svg')}"/></a>
				<a href="https://arc.codes" target="_blank">Documentation</a>
				${loginLinks}
			</nav>`
  }

  return `<!DOCTYPE html>
	<html>
	<head>
		<title>Architect demo app</title>
		<link rel=stylesheet href="${stylesheet}">
	</head>
	<body>	
		${nav}
		<body>
			${contents}
		</body>
	</html>`
}
