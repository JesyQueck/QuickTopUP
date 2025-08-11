import React from 'react';

const AuthToggle = ({ isLoginMode, onToggle }) => {
  return (
    <div className="text-center pt-6 border-t border-gray-100">
      <p className="text-sm text-gray-600">
        {isLoginMode ? 'New to QuickTopUp?' : 'Already have an account?'}{' '}
        <button 
          onClick={onToggle}
          className="text-primary font-semibold hover:text-primary/80 transition-colors duration-150 underline"
        >
          {isLoginMode ? 'Create Account' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};

export default AuthToggle;