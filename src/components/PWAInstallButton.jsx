import React, { useEffect, useState } from 'react';

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Uživatel nainstaloval aplikaci');
    } else {
      console.log('Uživatel odmítl instalaci');
    }
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        backgroundColor: '#00ffff',
        color: '#0f1115',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '10px',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '20px'
      }}
    >
      Instalovat aplikaci
    </button>
  );
};

export default PWAInstallButton;