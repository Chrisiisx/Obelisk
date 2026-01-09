import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMaster, setIsMaster] = useState(false)
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3001';
  //   function randomStr(length: number){

  //     let result = '';
  //     const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < length; i++) {
  //         const randomInd = Math.floor(Math.random() * characters.length);
  //         result += characters.charAt(randomInd);
  //     }
  //     return result;


  //   }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva il token
        let user = data.user
        if (user.email == "admin@admin.com") {
          setIsMaster(true)
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(user));

        if (isMaster) {
          navigate('/changemaster');
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(data.error || 'Credenziali non valide');
      }
    } catch (err) {
      setError('Errore di connessione al server');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMasterAccount = () => {
    setEmail('admin@admin.com');
    setPassword('admin');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-800 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-18 h-18 bg-white/10 rounded-full flex items-center justify-center">
                <img src={`https://gravatar.com/avatar/adminAvatar?s=400&d=robohash&r=x`} alt="profileImage" />
                <i className="fas fa-lock text-white text-2xl"></i>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-blue-100">Accedi al pannello di controllo</p>
          </div>

          {/* Body */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                <i className="fas fa-exclamation-circle mr-3"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="admin@admin.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition ${loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  } text-white shadow-md`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Accesso in corso...
                  </span>
                ) : (
                  'Accedi'
                )}
              </button>
            </form>

            
            {
              isMaster
              :
              <>
                <div className="mt-8 p-4 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <i className="fas fa-crown text-amber-500 mt-1 mr-3"></i>
                    <div>
                      <p className="text-amber-700 text-sm mb-2">
                        Usa queste credenziali per il primo accesso:
                      </p>
                      <div className="bg-white/50 p-3 rounded border border-amber-100">
                        <div className="flex items-center mb-1">
                          <span className="text-gray-600 text-sm w-16">Email:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">admin@admin.com</code>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 text-sm w-16">Password:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">admin</code>
                        </div>
                      </div>
                      <button
                        onClick={handleMasterAccount}
                        className="mt-3 text-sm text-amber-600 hover:text-amber-800 font-medium flex items-center"
                      >
                        <i className="fas fa-mouse-pointer mr-2"></i>
                        Usa queste credenziali
                      </button>
                    </div>
                  </div>
                </div>
              </>
              ?
              null
            }

          </div>
        </div>

        {/* Version Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            v1.0.0 • {new Date().getFullYear()} Obelisk
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;