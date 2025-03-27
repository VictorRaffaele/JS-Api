function regexEmail(email) {
    const funcTag = 'regexEmail';
    try {
        console.log(`${funcTag} Checking if email is valid`);
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    } catch (error) {
        console.error(`${funcTag} ${error.message}`);
        return false;
    }
}

function regexName(name) {
  const funcTag = 'regexName';
  try {
      console.log(`${funcTag} Checking if name is valid`);
      const re = /^[a-zA-Z]+$/;
      return re.test(name);
  } catch (error) {
      console.error(`${funcTag} ${error.message}`);
      return false;
  }
}

function regexPassword(password) {
    const funcTag = 'regexPassword';
    try {
        console.log(`${funcTag} Checking if password is valid`);
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    } catch (error) {
        console.error(`${funcTag} ${error.message}`);
        return false;
    }
}

module.exports = { regexEmail, regexName, regexPassword };