const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE);
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  let email = payload.email
  return email
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = verify