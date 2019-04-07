export default {
  formData: {
    error: "",
    login: {
      username: {
        value: "",
        errors: [],
        valid: false,
        touched: false,
        rules: {
          required: true
        }
      },
      password: {
        value: "",
        errors: [],
        valid: false,
        touched: false,
        required: true,
        rules: {
          required: true
        }
      }
    },
    register: {
      username: {
        value: "",
        errors: [],
        valid: false,
        touched: false,
        required: true,
        rules: {
          required: true,
          minLength: 3
        }
      },
      password: {
        value: "",
        errors: [],
        valid: false,
        touched: false,
        required: true,
        rules: {
          required: true,
          minLength: 5
        }
      },
      email: {
        value: "",
        errors: [],
        valid: false,
        touched: false,
        required: true,
        rules: {
          required: true,
          isEmail: true
        }
      }
    }
  },
  showForms: false
};
