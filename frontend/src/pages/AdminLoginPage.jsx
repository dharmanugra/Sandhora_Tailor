import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LogIn } from 'lucide-react';
import { mockLogin } from '../mock';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/admin/dashboard';
    
    // For now, using mock login (will be replaced with actual Google Auth)
    try {
      const user = await mockLogin();
      navigate('/admin/dashboard', { state: { user } });
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
    
    // Actual Google Auth will use:
    // window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };
  
  return (
    <div className="min-h-screen bg-cream-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-warm-sage blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-rich-chocolate blur-3xl" />
      </div>
      
      <motion.div
        className="relative z-10 max-w-md w-full bg-soft-gray p-12 rounded-lg shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-5xl mb-4 text-charcoal">Admin Portal</h1>
          <p className="font-sans text-warm-gray">Sandhora Tailor</p>
        </div>
        
        <div className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-warm-sage hover:bg-opacity-90 text-cream-white font-sans font-medium text-base tracking-wider py-6 rounded transition-all duration-300 hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-cream-white border-t-transparent rounded-full animate-spin" />
                SIGNING IN...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <LogIn className="w-5 h-5" />
                SIGN IN WITH GOOGLE
              </span>
            )}
          </Button>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="font-sans text-sm text-warm-gray hover:text-warm-sage transition-colors duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-warm-gray border-opacity-30">
          <p className="font-sans text-xs text-warm-gray text-center">
            Access restricted to authorized administrators only
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;