const jwt = require("jsonwebtoken");
const SECRET = "mySuperSecretKey123!";
function signToken(id){ return jwt.sign({id}, SECRET, {expiresIn:"2h"}); }
function verifyToken(token){ try{ return jwt.verify(token, SECRET);}catch(e){return null;} }
module.exports = { signToken, verifyToken, SECRET };
