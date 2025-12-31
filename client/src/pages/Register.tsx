import { useState, ChangeEvent, FC, ReactNode } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Shield, Loader2, CheckCircle } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:3001';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  hint: string;
};

type InputFieldProps = {
  label: string;
  name: keyof FormState;
  type?: string;
  value: string;
  placeholder?: string;
  icon: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rightElement?: ReactNode;
  required?: boolean;
  error?: string;
};

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  icon,
  onChange,
  rightElement,
  required,
  error
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full pl-10 pr-12 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-xl ${error ? 'bg-red-50' : 'bg-gray-50'} focus:bg-white focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition`}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// API Service for registration
const registerUser = async (email: string, password: string, hint?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        hint: hint || ''
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    console.log(response.json())
    return await response.json();
  } catch (error: any) {
    console.error('Registration API error:', error);
    
    // Network error handling
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Make sure the backend is running.');
    }
    
    throw error;
  }
};

const Register: FC = () => {
  const [visible, setVisible] = useState({
    password: false,
    confirm: false
  });

  const [data, setData] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    hint: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Optional hint validation
    if (data.hint && data.hint.length > 100) {
      newErrors.hint = 'Hint must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // API call for registration
      const result = await registerUser(data.email, data.password, data.hint);
      
      console.log('Registration successful:', result);
      setSuccess(true);
      
      // Reset form after successful registration
      setTimeout(() => {
        setData({
          email: '',
          password: '',
          confirmPassword: '',
          hint: ''
        });
      }, 2000);
      
      // Handle token if returned
      if (result.data?.token) {
        localStorage.setItem('obelisk_token', result.data.token);
        localStorage.setItem('obelisk_user', JSON.stringify(result.data.user));
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If registration was successful, show a message
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50 p-4">
        <div className="w-full max-w-md">
          <header className="text-center mb-8">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-linear-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white w-10 h-10" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Account Created!</h1>
            <p className="text-gray-600 mt-2">
              Welcome to Obelisk Password Manager
            </p>
          </header>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <p className="text-gray-700 mb-6">
              Your account has been successfully created. You'll be redirected to the dashboard shortly.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-md"
              >
                Go to Dashboard Now
              </button>
              
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Create Another Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Create Your Obelisk</h1>
          <p className="text-gray-600 mt-2">
            Secure password manager for teams and individuals
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 text-sm">{apiError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={data.email}
              onChange={updateField}
              placeholder="you@company.com"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              required
              error={errors.email}
            />

            <InputField
              label="Master Password"
              name="password"
              type={visible.password ? 'text' : 'password'}
              value={data.password}
              onChange={updateField}
              placeholder="At least 8 characters with uppercase, lowercase, and numbers"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              required
              error={errors.password}
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setVisible(v => ({ ...v, password: !v.password }))
                  }
                  className="focus:outline-none p-1 hover:bg-gray-100 rounded"
                  aria-label={visible.password ? "Hide password" : "Show password"}
                >
                  {visible.password ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              }
            />

            <InputField
              label="Confirm Master Password"
              name="confirmPassword"
              type={visible.confirm ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={updateField}
              placeholder="Type your password again"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              required
              error={errors.confirmPassword}
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setVisible(v => ({ ...v, confirm: !v.confirm }))
                  }
                  className="focus:outline-none p-1 hover:bg-gray-100 rounded"
                  aria-label={visible.confirm ? "Hide password" : "Show password"}
                >
                  {visible.confirm ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              }
            />

            <InputField
              label="Password Hint (Optional)"
              name="hint"
              value={data.hint}
              onChange={updateField}
              placeholder="A hint to help you remember your master password"
              icon={<User className="w-5 h-5 text-gray-400" />}
              error={errors.hint}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Secure Account...
                  </>
                ) : (
                  'Create Secure Account'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Already have an Obelisk account?{' '}
              <a 
                href="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 space-y-3">
          <div className="flex items-center justify-center gap-2 bg-blue-50 p-3 rounded-xl">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium">End-to-end encryption</span>
            <span className="text-blue-600">•</span>
            <span className="text-blue-700 font-medium">Zero-knowledge architecture</span>
          </div>
          
          <p className="text-center text-xs">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;