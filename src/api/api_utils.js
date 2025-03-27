function regexEmail(email) {
    const funcTag = '[regexEmail]';
    try {
        console.log(`${funcTag} Checking if email is valid`);
        const re = /\S+@\S+\.\S+/;
        const valid = re.test(email);
        if (!valid) {
            console.log(`${funcTag} Email has invalid format`);
            return false;
        }
        console.log(`${funcTag} Email is valid`);
        return true;
    } catch (error) {
        console.error(`${funcTag} ${error.message}`);
        return false;
    }
}

function regexName(name) {
  const funcTag = '[regexName]';
  try {
        console.log(`${funcTag} Checking if name is valid`);
        const re = /^[a-zA-Z]+$/;
        const valid = re.test(name);
        if (!valid) {
            console.log(`${funcTag} Name has invalid format`);
            return false;
        }
        console.log(`${funcTag} Name is valid`);
        return ;
  } catch (error) {
        console.error(`${funcTag} ${error.message}`);
        return false;
  }
}

function regexPassword(password) {
    const funcTag = '[regexPassword]';
    try {
        console.log(`${funcTag} Checking if password is valid`);
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const valid = re.test(password);
        if (!valid) {
            console.log(`${funcTag} Password has invalid format`);
            return false;
        }
        console.log(`${funcTag} Password is valid`);
        return true;
    } catch (error) {
        console.error(`${funcTag} ${error.message}`);
        return false;
    }
}

module.exports = { regexEmail, regexName, regexPassword };