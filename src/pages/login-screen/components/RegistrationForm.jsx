import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+234|0)[789]\d{9}$/?.test(formData?.phoneNumber?.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Nigerian phone number';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.fullName);
      localStorage.setItem('userPhone', formData?.phoneNumber);
      localStorage.setItem('loginMethod', 'email');
      
      // Navigate to dashboard
      navigate('/dashboard-screen');
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData?.fullName && formData?.email && formData?.phoneNumber && 
    formData?.password && formData?.confirmPassword && acceptTerms && 
    Object.keys(errors)?.length === 0;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {/* General Error Message */}
      {errors?.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{errors?.general}</p>
        </div>
      )}

      {/* Full Name Input */}
      <div className="space-y-2">
        <Input
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          disabled={isLoading}
          required
          className="w-full"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          disabled={isLoading}
          required
          className="w-full"
        />
      </div>

      {/* Phone Number Input */}
      <div className="space-y-2">
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          placeholder="080XXXXXXXX or +234XXXXXXXXXX"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          disabled={isLoading}
          required
          className="w-full"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            disabled={isLoading}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors duration-150"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            disabled={isLoading}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-colors duration-150"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="flex items-start space-x-3">
        <button
          type="button"
          onClick={() => {
            setAcceptTerms(!acceptTerms);
            if (errors?.terms) {
              setErrors(prev => ({
                ...prev,
                terms: ''
              }));
            }
          }}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
            acceptTerms
              ? 'bg-primary border-primary text-white' :'border-gray-300 hover:border-gray-400'
          }`}
          disabled={isLoading}
        >
          {acceptTerms && <Icon name="Check" size={12} />}
        </button>
        <div className="text-sm">
          <span className="text-gray-700">
            I agree to QuickTopUp's{' '}
            <button type="button" className="text-primary hover:text-primary/80 font-medium">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-primary hover:text-primary/80 font-medium">
              Privacy Policy
            </button>
          </span>
          {errors?.terms && (
            <p className="text-red-600 text-xs mt-1">{errors?.terms}</p>
          )}
        </div>
      </div>

      {/* Register Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid || isLoading}
        className="bg-primary hover:bg-primary/90 text-white font-semibold"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;