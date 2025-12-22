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

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      setSavedKey(saved);
      setApiKey(saved);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setMessage('Please enter an API key');
      return;
    }

    localStorage.setItem(SETTINGS_KEY, apiKey.trim());
    setSavedKey(apiKey.trim());
    setMessage('✅ API Key saved successfully!');
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 2000);
  };

  const handleClear = () => {
    localStorage.removeItem(SETTINGS_KEY);
    setApiKey('');
    setSavedKey('');
    setMessage('API Key cleared');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading text-gray-900 uppercase tracking-widest">
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Your Google API Key</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Enter your personal Google Gemini API key to enable unlimited coloring page generation. 
              Your key is stored securely in your browser and never shared.
            </p>
          </div>

          {/* Status */}
          {savedKey && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-sm font-bold text-green-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                API Key is configured and active
              </p>
            </div>
          )}

          {/* API Key Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-3 pr-24 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none text-sm font-mono transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold text-gray-600 hover:text-gray-800 uppercase tracking-wider"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
            <p className="text-sm text-blue-900 mb-2">
              <strong>Don't have an API key?</strong>
            </p>
            <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
              <li>Visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline font-bold">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API key"</li>
              <li>Copy your key and paste it above</li>
            </ol>
          </div>

          {/* Message */}
          {message && (
            <div className={`text-center py-2 px-4 rounded-xl ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              <p className="text-sm font-bold">{message}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wider text-sm"
            >
              Save API Key
            </button>
            {savedKey && (
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-all uppercase tracking-wider text-sm border-2 border-gray-200"
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
