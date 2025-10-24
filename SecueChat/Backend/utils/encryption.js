const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa",{ modulusLength:2048 });
function encryptMessage(message){
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);
  let encrypted = cipher.update(message,"utf8","base64");
  encrypted += cipher.final("base64");
  const encKey = crypto.publicEncrypt(publicKey, aesKey);
  return { data: encrypted, iv: iv.toString("base64"), key: encKey.toString("base64") };
}
function decryptMessage({data,iv,key}){
  const aesKey = crypto.privateDecrypt(privateKey, Buffer.from(key,"base64"));
  const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, Buffer.from(iv,"base64"));
  let dec = decipher.update(data,"base64","utf8");
  return dec + decipher.final("utf8");
}
module.exports = { encryptMessage, decryptMessage };
