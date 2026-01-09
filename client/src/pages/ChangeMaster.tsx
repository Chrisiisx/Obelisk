import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangeMaster: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:3001';

  const verifyAuthentication = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || token.trim() === '') {
      return false;
    }

    if (!userStr) {
      return false;
    }

    try {
      const user = JSON.parse(userStr);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid && data.user) {
          setUserEmail(data.user.email);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Auth verification failed:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authValid = await verifyAuthentication();
      
      if (!authValid) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!currentEmail.trim() || !currentPassword.trim()) {
      setError('Inserisci email e password attuali');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Le nuove password non corrispondono');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('La nuova password deve essere almeno di 8 caratteri');
      setLoading(false);
      return;
    }

    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Inserisci una email valida');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        setError('Sessione scaduta. Effettua il login di nuovo.');
        navigate('/login');
        return;
      }

      const user = JSON.parse(userStr);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/change-master`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          userId: user.id,
          currentEmail: currentEmail.trim(), 
          currentPassword: currentPassword.trim(), 
          newEmail: newEmail.trim(), 
          newPassword: newPassword.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account master aggiornato con successo!');
        
        if (data.user && data.token) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
        }
        
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(data.error || 'Errore durante l\'aggiornamento');
        
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setTimeout(() => navigate('/login'), 1500);
        }
      }
    } catch (err) {
      setError('Errore di connessione al server');
      console.error('Change master error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifica autenticazione in corso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-center">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white text-sm flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
              
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <i className="fas fa-user-cog text-white text-xl"></i>
              </div>
              
              <button
                onClick={handleCancel}
                className="text-white/80 hover:text-white text-sm flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Indietro
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Cambio Credenziali Master</h1>
            <p className="text-purple-100 text-sm">
              Utente: <span className="font-semibold">{userEmail}</span>
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                <i className="fas fa-exclamation-circle mr-3"></i>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                <span>{success}</span>
              </div>
            )}

            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Attenzione</h3>
                  <p className="text-blue-700 text-sm">
                    Stai modificando le credenziali dell'account master. 
                    Dopo questa operazione, le vecchie credenziali non saranno più valide.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  <i className="fas fa-key mr-2 text-gray-500"></i>
                  Credenziali Attuali
                </h3>
                
                <div className="mb-4">
                  <label htmlFor="currentEmail" className="block text-gray-700 font-medium mb-2">
                    Email Attuale
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="currentEmail"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder={userEmail}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                    Password Attuale
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i className={`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  <i className="fas fa-user-edit mr-2 text-gray-500"></i>
                  Nuove Credenziali
                </h3>
                
                <div className="mb-4">
                  <label htmlFor="newEmail" className="block text-gray-700 font-medium mb-2">
                    Nuova Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="newEmail"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="nuova@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                    Nuova Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="Almeno 8 caratteri"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimo 8 caratteri
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                    Conferma Nuova Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="Ripeti la nuova password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold transition bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md"
                >
                  <i className="fas fa-times mr-2"></i>
                  Annulla
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${loading
                      ? 'bg-purple-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                    } text-white shadow-md`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Aggiornamento...
                    </span>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Salva Cambiamenti
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <i className="fas fa-shield-alt text-amber-500 mt-1 mr-3"></i>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">Sicurezza</h3>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-xs mt-1 mr-2 text-green-500"></i>
                      <span>Dopo il cambio, l'account master originale non sarà più accessibile</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-xs mt-1 mr-2 text-green-500"></i>
                      <span>Assicurati di essere l'unico ad avere accesso alle nuove credenziali</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-xs mt-1 mr-2 text-green-500"></i>
                      <span>Ti verrà richiesto di ri-effettuare il login con le nuove credenziali</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            v1.0.0 • {new Date().getFullYear()} Obelisk
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeMaster;