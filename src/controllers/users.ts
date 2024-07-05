const createUser = (data) => {
 try {
  let { firstName, lastName, email, password } = data;
  if (!firstName || !lastName || !email || !password) {
   throw Error("All fields are required.")
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
 } catch (error) {
  throw Error("")
 }
}