import React, { useState } from 'react';

function AuthForm({ isLogin, setIsLogin, username, setUsername, password, setPassword, handleAuth, error }) {
  const [loading, setLoading] = useState(false); // Loading state for button
  const [validationError, setValidationError] = useState(''); // Validation error message

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (username.trim() === '' || password.trim() === '') {
      setValidationError('Username and password are required.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    setValidationError(''); // Clear validation error
    setLoading(true);
    await handleAuth(e);
    setLoading(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center text-blue-600">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {validationError && <p className="text-red-500 mb-4">{validationError}</p>}
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
          <p 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-500 cursor-pointer mt-4 text-center"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;