import { UserContext } from "./../context/UserContext";
import React, { useState, useContext, useEffect } from "react";
import PWAInstallButton from '../components/PWAInstallButton';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { setUser, setIsAdmin } = useContext(UserContext);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setError('');

    if (username === 'admin') {
      if (password === '1234') {
        setIsAdmin(true);
        setUser('admin');
      } else {
        setError('Špatné heslo');
      }
    } else if (username) {
      setIsAdmin(false);
      setUser(username);
    } else {
      setError('Zadej jméno');
    }

    setLoading(false);
  };

  return (
    <>
      <h2>Přihlášení</h2>
      <input
        type="text"
        placeholder="Zadej jméno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {username === 'admin' && (
        <input
          type="password"
          placeholder="Zadej heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button disabled={loading} onClick={handleLogin}>Přihlásit</button>
      {deferredPrompt && <PWAInstallButton />}
    </>
  );
};

export default LoginScreen;