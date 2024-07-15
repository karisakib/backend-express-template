const generateOTP = async () => {
 try {
  const generatedOTP = `${Math.floor(100000 + Math.random() * 900000)}`
  return generatedOTP;
 } catch (error) {
  throw Error(`Unable to generate OTP. Check generateOTP.js file.`)
 }
}

module.exports = generateOTP;