const { body } = require("express-validator");

exports.registerValidation = [
  // Name validation
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 30 }).withMessage("Name can be max 30 characters"),

  // Email validation
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email must be valid"),

  // Password validation
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

  // Role
  body("role")
    .notEmpty().withMessage("Role is required"),

  // Code
  body("code").custom((value, { req }) => {
      if (req.body.role !== 'student' && (!value || value.trim() === "")) {
        throw new Error("Code is required for non-student roles");
      }
      return true;
    })
];
