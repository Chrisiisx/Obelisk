import React from 'react';
import { Shield, Lock, Users, Zap, ArrowRight, CheckCircle, Star, Globe, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Crittografia End-to-End",
      description: "Le tue password sono cifrate sul tuo dispositivo prima di raggiungere i nostri server. Solo tu hai le chiavi."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Condivisione Sicura",
      description: "Condividi credenziali con team o clienti in modo controllato, senza esporre le password in chiaro."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Accesso Rapido",
      description: "Interfaccia ottimizzata per trovare e utilizzare le password in pochi secondi."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Open Source",
      description: "Codice completamente trasparente. Auto-ospitalo o contribuisci al progetto."
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: "Zero-Knowledge",
      description: "Architettura a conoscenza zero. Nemmeno noi possiamo accedere alle tue credenziali."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Sicurezza Pronta",
      description: "Audit di sicurezza regolari e aggiornamenti continui per proteggere i tuoi dati."
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      role: "Freelancer Web Developer",
      text: "Finalmente uno strumento che mi permette di separare le password dei clienti in modo sicuro e organizzato.",
      rating: 5
    },
    {
      name: "Laura Bianchi",
      role: "CTO di StartupTech",
      text: "Abbiamo migrato tutto il team su Obelisk. La condivisione sicura ha rivoluzionato il nostro workflow.",
      rating: 5
    },
    {
      name: "Andrea Verdi",
      role: "Consulente IT",
      text: "L'auto-ospitalità era un requisito fondamentale per noi. Obelisk è perfetto e incredibilmente ben fatto.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Obelisk</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Accedi
              </Link>
              <Link 
                to="/register" 
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Inizia Gratis
              </Link>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Password Management
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Sicuro & Collaborativo
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Il gestore password open source progettato per team, freelancer e chiunque desideri il controllo totale dei propri dati.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Crea il Tuo Account Gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="https://github.com/Chrisiisx/Obelisk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-medium text-lg border border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Vedi su GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perché Scegliere Obelisk
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unisciti a migliaia di utenti che hanno rivoluzionato il modo di gestire le password
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cosa Dicono di Noi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professionisti che affidano a Obelisk la sicurezza delle loro credenziali
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto a Prendere il Controllo?
            </h2>
            <p className="text-blue-100 text-xl mb-10">
              Unisciti a Obelisk oggi stesso. Gratuito per uso personale, potente per i team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-medium text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Inizia Gratis per 14 Giorni
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center bg-transparent hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg border-2 border-white hover:border-blue-300 transition-all duration-200"
              >
                Scopri di Più
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Nessuna carta di credito richiesta</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Supporto 24/7 per la comunità</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>100% open source e trasparente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Obelisk</span>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2">© {new Date().getFullYear()} Obelisk. Un progetto open source.</p>
              <p className="text-gray-500">Costruito con passione per la sicurezza digitale.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;