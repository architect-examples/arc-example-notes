@app
notes

@http
get /
get /login
get /signup
get /logout
get /notes
post /login
post /signup

post /notes
get /notes/:noteID
post /notes/:noteID
post /notes/:noteID/delete

@tables
people
  email *String

notes
  email *String
  noteID **String

# You'll need to rename these to something unique - see README
@static
staging arc-example-notes-staging
production arc-example-notes-production