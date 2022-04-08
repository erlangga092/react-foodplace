export const rules = {
  email: {
    required: {
      value: true,
      message: "Email harus diisi",
    },
    maxLength: {
      value: 255,
      message: "Email maksimal 255 karakter",
    },
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: "Email tidak valid",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password harus diisi",
    },
    minLength: {
      value: 3,
      message: "Password minimal 3 karakter",
    },
    maxLength: {
      value: 255,
      message: "Password maksimal 255 karakter",
    },
  },
};
