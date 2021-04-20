let arc = require('@architect/functions')

module.exports = async function getNotes(email) {
  let data = await arc.tables()
  let result = await data.notes.query({
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  })
  return result.Items
}
