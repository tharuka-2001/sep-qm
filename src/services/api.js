// Mock API service for testing
let registeredUsers = [];

export const registerUser = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store the registered user
  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    createdAt: new Date().toISOString()
  };
  
  registeredUsers.push(newUser);
  
  // Mock successful response
  return {
    success: true,
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    }
  };
};

export const validateUsername = async (username) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if username is already taken
  const isTaken = registeredUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
  
  return {
    available: !isTaken
  };
};

export const loginUser = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Login attempt with:', credentials);
  console.log('Registered users:', registeredUsers);

  // Find the user in registered users
  const user = registeredUsers.find(
    u => u.username === credentials.username && u.password === credentials.password
  );

  if (user) {
    return {
      success: true,
      data: {
        id: user.id,
        username: user.username,
        token: 'mock-jwt-token'
      }
    };
  } else {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }
}; 