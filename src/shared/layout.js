let arc = require('@architect/functions'),
  url = arc.http.helpers.url,
  static = arc.http.helpers.static

module.exports = function layout(contents, showNav = true, isLoggedIn = true) {
  var nav = ''

  var navLinks = `
		<a class="button subtle" href="${url('/login')}">Log in</a>
		<a class="button" href="${url('/signup')}">Sign up</a>
	`
  if (isLoggedIn) {
    navLinks = `
			<a class="button subtle" href="${url('/logout')}">Log out</a>
		`
  }

  if (showNav) {
    nav = `
			<nav>
				<a href="/">
					<img class="logo" src="${static('/images/logo.svg')}"/>
				</a>
				<a href="https://arc.codes" target="_blank">Documentation</a>
				${navLinks}
			</nav>`
  }

  return `<!DOCTYPE html>
	<html>
	<head>
		<title>Architect demo app</title>
		<link rel=stylesheet href="${static('/css/style.css')}">
		<link rel="icon" type="image/png" sizes="16x16" href="${static('/images/architect-favicon-16.png')}">
		<link rel="icon" type="image/png" sizes="32x32" href="${static('/images/architect-favicon-32.png')}">
		<link rel="icon" type="image/png" sizes="64x64" href="${static('/images/architect-favicon-64.png')}">
	</head>
	<body>	
		${nav}
		<body>
			${contents}
		</body>
	</html>`
}
