import React, { useState, useEffect } from 'react';

const SETTINGS_KEY = 'cea_user_api_key';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      setSavedKey(saved);
      setApiKey(saved);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setMessage('⚠️ Please enter an API key to continue');
      return;
    }

    localStorage.setItem(SETTINGS_KEY, apiKey.trim());
    setSavedKey(apiKey.trim());
    setIsFirstTime(false);
    setMessage('✅ API Key saved successfully!');
    
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1500);
  };

  const handleClear = () => {
    localStorage.removeItem(SETTINGS_KEY);
    setApiKey('');
    setSavedKey('');
    setMessage('API Key cleared');
    setIsFirstTime(true);
  };

  const handleClose = () => {
    // Only allow closing if they have a saved key
    if (savedKey) {
      onClose();
    } else {
      setMessage('⚠️ Please save your API key before closing');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-heading uppercase tracking-widest" style={{ color: '#FFC107' }}>
              {isFirstTime ? '👋 Welcome!' : '⚙️ Settings'}
            </h2>
            {isFirstTime && (
              <p className="text-sm text-gray-600 mt-1">Let's get you set up with your API key</p>
            )}
          </div>
          {/* Only show X button if they already have a key saved */}
          {savedKey && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {isFirstTime && (
            <div className="border-2 rounded-xl p-4" style={{ backgroundColor: '#D4BFFF20', borderColor: '#D4BFFF' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#485563' }}>
                <strong>Premium Unlimited Access!</strong><br />
                Enter your personal Google Gemini API key below to unlock unlimited coloring page generation. Your key stays private in your browser.
              </p>
            </div>
          )}

          {/* Status */}
          {savedKey && !isFirstTime && (
            <div className="border-2 rounded-xl p-4" style={{ backgroundColor: '#B2F7EF30', borderColor: '#B2F7EF' }}>
              <p className="text-sm font-bold flex items-center" style={{ color: '#485563' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                API Key is configured and active
              </p>
            </div>
          )}

          {/* API Key Input */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: '#6B7280' }}>
              Your Google API Key {isFirstTime && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 pr-24 border-2 rounded-xl focus:ring-4 outline-none text-sm font-mono transition-all"
                style={{ 
                  backgroundColor: '#F3F4F6', 
                  borderColor: '#6B7280',
                  color: '#485563'
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:opacity-80"
                style={{ color: '#6B7280' }}
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="border-l-4 p-4 rounded-r-xl" style={{ backgroundColor: '#B2F7EF20', borderColor: '#B2F7EF' }}>
            <p className="text-sm mb-2" style={{ color: '#485563' }}>
              <strong>How to get your FREE API key:</strong>
            </p>
            <ol className="text-sm space-y-1 ml-4 list-decimal" style={{ color: '#6B7280' }}>
              <li>Visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-80" style={{ color: '#485563' }}>Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API key"</li>
              <li>Copy your key and paste it above</li>
              <li>Click "Save API Key" below</li>
            </ol>
            <p className="text-xs mt-3 italic" style={{ color: '#6B7280' }}>
              Your free API key gives you 1,500 pages per day - more than enough for any family!
            </p>
          </div>

          {/* Need Help? */}
          {isFirstTime && (
            <div className="border-2 rounded-xl p-4 text-center" style={{ backgroundColor: '#D4BFFF10', borderColor: '#D4BFFF' }}>
              <p className="text-sm font-bold mb-2" style={{ color: '#485563' }}>
                📞 Need Help Getting Set Up?
              </p>
              <p className="text-xs mb-3" style={{ color: '#6B7280' }}>
                Book a quick 15-minute call and I'll walk you through it step-by-step!
              </p>
              
                href="https://api.leadconnectorhq.com/widget/booking/yrrKfoRefwg94H2ErApt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wider text-xs"
                style={{ backgroundColor: '#FFC107' }}
              >
                Schedule Setup Call
              </a>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`text-center py-2 px-4 rounded-xl font-bold text-sm ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wider text-sm hover:opacity-90"
              style={{ backgroundColor: '#D4BFFF' }}
            >
              {isFirstTime ? 'Save & Get Started' : 'Save API Key'}
            </button>
            {savedKey && !isFirstTime && (
              <button
                onClick={handleClear}
                className="px-6 py-3 font-bold rounded-xl transition-all uppercase tracking-wider text-sm border-2 hover:bg-red-50 hover:text-red-600"
                style={{ backgroundColor: '#F3F4F6', color: '#6B7280', borderColor: '#6B7280' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

export const getUserApiKey = (): string | null => {
  return localStorage.getItem(SETTINGS_KEY);
};
