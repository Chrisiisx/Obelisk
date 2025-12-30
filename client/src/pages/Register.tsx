import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Shield } from 'lucide-react';

const Register: React.FC = () => {
  // Stato solo per UI (nessuna logica di submit)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Valori placeholder per i campi
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    masterPasswordHint: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Titolo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Crea il tuo account</h1>
          <p className="text-gray-600 mt-2">Inizia a proteggere le tue password con Obelisk</p>
        </div>

        {/* Card del Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Indirizzo Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="tu@esempio.com"
                  required
                />
              </div>
            </div>

            {/* Campo Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Almeno 8 caratteri"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                Almeno 8 caratteri con lettere e numeri
              </div>
            </div>

            {/* Campo Conferma Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Conferma Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Ripeti la password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo Suggerimento Password Master */}
            <div>
              <label htmlFor="masterPasswordHint" className="block text-sm font-medium text-gray-700 mb-2">
                Suggerimento Password Master (opzionale)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="masterPasswordHint"
                  name="masterPasswordHint"
                  value={formData.masterPasswordHint}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Es: Il nome del mio primo animale domestico"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Ti aiuterà a ricordare la tua password master. Non condividerlo con nessuno.
              </p>
            </div>

            {/* Checkbox Termini e Condizioni */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Accetto i{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Termini di Servizio
                </a>{' '}
                e l'{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Informativa sulla Privacy
                </a>
              </label>
            </div>

            {/* Pulsante di Registrazione */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Crea Account
            </button>
          </form>

          {/* Link per il Login */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Hai già un account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Accedi qui
              </a>
            </p>
          </div>
        </div>

        {/* Messaggio di Sicurezza */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-sm text-blue-800 flex items-center justify-center">
            <Shield className="h-4 w-4 mr-2" />
            Tutti i dati sono cifrati end-to-end. Nemmeno noi possiamo leggerli.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;