const API_BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'accessToken';
const USER_KEY = 'currentUser';

// Simpan token ke localStorage
const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Ambil token dari localStorage
const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token && token !== 'undefined' && token !== 'null' && token.trim() !== '' ? token : null;
};

// Simpan user ke localStorage
const saveCurrentUser = (user) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Ambil user dari localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Login user
const login = async ({ username, password }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Username atau password salah');
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('Token tidak ditemukan dalam response');
    }

    saveToken(data.access_token);
    saveCurrentUser({ username });
    return data;
  } catch (error) {
    throw error;
  }
};

// Register user
const register = async ({ username, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Gagal mendaftar');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Logout user
const logout = async () => {
  try {
    const token = getToken();
    if (token) {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Export semua fungsi
const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
};

export default authService;
