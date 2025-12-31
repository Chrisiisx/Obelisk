import { useState, ChangeEvent, FC, ReactNode } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Shield } from 'lucide-react';

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
  required
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
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
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

  const updateField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <Shield className="text-white w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-gray-600 mt-2">
            A simple way to keep your passwords safe.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={updateField}
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              required
            />

            <InputField
              label="Password"
              name="password"
              type={visible.password ? 'text' : 'password'}
              value={data.password}
              onChange={updateField}
              placeholder="Minimum 8 characters"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setVisible(v => ({ ...v, password: !v.password }))
                  }
                >
                  {visible.password ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              }
            />

            <InputField
              label="Confirm password"
              name="confirmPassword"
              type={visible.confirm ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={updateField}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setVisible(v => ({ ...v, confirm: !v.confirm }))
                  }
                >
                  {visible.confirm ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              }
            />

            <InputField
              label="Password hint (optional)"
              name="hint"
              value={data.hint}
              onChange={updateField}
              placeholder="Something only you understand"
              icon={<User className="w-5 h-5 text-gray-400" />}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
            >
              Create account
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-center text-blue-700 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Your data is encrypted end-to-end.
        </p>
      </div>
    </div>
  );
};

export default Register;
