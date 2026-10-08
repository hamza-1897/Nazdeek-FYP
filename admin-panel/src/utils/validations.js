export const validateEmail = (email) => {
  if (!email || !email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return ""; 
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Min 8 characters required for password, use 1 uppercase, 1 lowercase, 1 number and 1 special character";
  if (!/[A-Z]/.test(password)) return "At least 1 uppercase letter required";
  if (!/[a-z]/.test(password)) return "At least 1 lowercase letter required";
  if (!/[0-9]/.test(password)) return "At least 1 number required";
  if (!/[@$!%*?&]/.test(password)) return "At least 1 special character required";
  return "";
};

export const validateNoNumbers = (text, fieldName = "Field") => {
  if (!text || !text.trim()) return `${fieldName} is required`;
  
  if (/\d/.test(text)) {
    return "Numbers are not allowed";
  }
  return "";
};

export const validateNoSpecialChars = (text, fieldName = "Field") => {
  if (!text || !text.trim()) return `${fieldName} is required`;
  
  const noSpecialRegex = /^[a-zA-Z0-9\s]+$/;
  if (!noSpecialRegex.test(text)) {
    return "Special characters are not allowed";
  }
  return "";
};

export const validatePositiveNumber = (val, fieldName = "Price") => {
  if (val === "" || val === null || val === undefined) return `${fieldName} is required`;
  if (isNaN(val)) return "Must be a valid number";
  if (Number(val) <= 0) return "Negative or zero numbers are not allowed";
  return "";
};