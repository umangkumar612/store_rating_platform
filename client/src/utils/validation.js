export const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]`~]).{8,16}$/;

export function validateUserForm(values, { includePassword = true } = {}) {
  const errors = {};
  if (!values.name || values.name.length < 3 || values.name.length > 50) {
    errors.name = "Name must be 20 to 60 characters.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email || "")) {
    errors.email = "Enter a valid email.";
  }
  if ((values.address || "").length > 400) {
    errors.address = "Address must be at most 400 characters.";
  }
  if (includePassword && !passwordPattern.test(values.password || "")) {
    errors.password = "Password must be 8-16 chars with uppercase and special character.";
  }
  return errors;
}
