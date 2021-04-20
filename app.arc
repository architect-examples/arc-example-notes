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
