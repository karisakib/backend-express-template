const isValidator = (pattern, input) => {
 const re = new RegExp(pattern)
 if (!re.test(input)) {
  console.log(`String "${input}" failed to pass ${pattern} regex validator.`);
 } else {
  console.log(`String "${input}" passed ${pattern} regex validator.`);
 }
}

// test patterns

namePattern = /^[A-Za-z ]+$/
emailPattern = 

isValidator(namePattern, "kari 22sakib")



/////////////////////////////////////////////////////////////


function isValidName(name) {
 const regex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
 return regex.test(name);
}

console.log(isValidName("Jean-Luc Picard")); // true
console.log(isValidName("O'Neill")); // true
console.log(isValidName("Anne Marie")); // true
console.log(isValidName("1234")); // false


function isValidEmail(email) {
 const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 return regex.test(email);
}

console.log(isValidEmail("example@email.com")); // true
console.log(isValidEmail("example@.com")); // false


function isValidPhoneNumber(phoneNumber) {
 const regex = /^\+?(\d{1,3})?[-. ]?\(?\d{1,3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
 return regex.test(phoneNumber);
}

console.log(isValidPhoneNumber("+1 (555) 123-4567")); // true
console.log(isValidPhoneNumber("555-1234")); // false

function isValidPassword(password) {
 const regex = /^[A-Za-z0-9!@#$%^&*()_+]{8,20}$/;
 return regex.test(password);
}

console.log(isValidPassword("examplePassword123!")); // true
console.log(isValidPassword("short")); // false

