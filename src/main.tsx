import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'YOUR_PUBLISHABLE_KEY') {
  // Instead of crashing with a white screen, render a helpful message
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#e11d48' }}>Configuration requise</h1>
        <p>L'application a besoin de votre clé Clerk pour fonctionner.</p>
        <ol style={{ lineHeight: '1.6' }}>
          <li>Ouvrez le fichier <code>.env.local</code> à la racine du projet.</li>
          <li>Remplacez <code>YOUR_PUBLISHABLE_KEY</code> par votre vraie clé publique Clerk (commençant par <code>pk_test_...</code>).</li>
          <li>Redémarrez le serveur (Ctrl+C puis <code>npm run dev</code>).</li>
        </ol>
        <p>Si vous n'avez pas de clé, créez un compte sur <a href="https://clerk.com" target="_blank">clerk.com</a>.</p>
      </div>
    </StrictMode>,
  )
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}
