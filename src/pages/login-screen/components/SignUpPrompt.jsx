import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPrompt = () => {
  return (
    <div className="text-center pt-6 border-t border-gray-100">
      <p className="text-sm text-gray-600">
        New user?{' '}
        <Link 
          to="/splash-screen" 
          className="text-primary font-semibold hover:text-primary/80 transition-colors duration-150"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignUpPrompt;