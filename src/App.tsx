import './types/images.d.ts';
import { CurrentPage } from './components/CurrentPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingTemplate } from './views/LoadingTemplate';
import { Provider } from 'overmind-react';
import { overmindApp } from './presenter/presenter';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './MadisonSwimming-Logo-Small.webp';

import './styles.css';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app and load data
    overmindApp.actions
      .initializeApp()
      .then(() => setIsInitialized(true))
      .catch((error) => {
        console.error('App initialization failed:', error);
        // Still show UI, but with error state
        setIsInitialized(true);
      });
  }, []);

  if (!isInitialized) {
    return <LoadingTemplate />;
  }

  return (
    <Provider value={overmindApp}>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <img
            className="mx-auto h-16 inline w-auto"
            src={logo}
            alt="Madison Swimming Logo"
          />
          <hr className="my-4" />
          <CurrentPage />
        </div>
      </main>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  window.document.querySelector('#app'),
);
