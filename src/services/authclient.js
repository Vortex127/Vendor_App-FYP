// Local authentication service
const users = [];

export const authService = {
  login: async (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  },

  signup: async (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const newUser = { ...userData, id: Date.now().toString() };
    users.push(newUser);
    return newUser;
  },

  logout: async () => {
    // Nothing to do for local auth
    return true;
  }
};
