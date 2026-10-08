
export const checkPasswordRules = (password = '') => {
  return {
    hasMinLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
};

export const isPasswordValid = (password = '') => {
  const rules = checkPasswordRules(password);
  return rules.hasMinLength && rules.hasUpper && rules.hasLower && rules.hasNumber;
};

export const validateCNIC = (cnic = '') => {
  
  if (!cnic) return "CNIC number required.";
  if (cnic.length !== 13) return "CNIC number must be 13 digits.";
  return null;
};

export const validatePhone = (phone = '') => {

  if (!phone) return "Phone number required.";
  if (phone.length !== 11) return "Phone number must be 11 digits.";
  return null;
};

export const validateAddress = (address = '', minLength = 10) => {
  if (!address || address.trim().length < minLength) {
    return `Address must be at least ${minLength} characters.`;
  }
  return null;
};

export const validateExperience = (exp) => {
  const numExp = Number(exp);
  if (exp === '' || exp === null || isNaN(numExp)) return "Experience required.";
  if (numExp < 0) return "Experience must be a positive number.";
  return null;
};

export const validateAlphaNumeric = (text = '', fieldName = 'Field') => {
  if (!text || !text.trim()) return `${fieldName} required.`;
  const regex = /^[a-zA-Z0-9\s]+$/;
  if (!regex.test(text.trim())) {
    return `${fieldName} cannot contain special characters.`;
  }
  return null;
};

export const validateEmail = (email = '') => {
  const cleanEmail = email.trim();
  if (!cleanEmail) {
    return "Email address required.";
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }
  
  return null; 
};