import { CurrentPage } from './components/CurrentPage';
import { Provider } from 'overmind-react';
import { overmindApp } from './presenter/presenter';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmindApp}>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <nav className="mb-4">
            Search:
            <ul>
              <li>
                <a href="/swimmer">By Swimmer</a>
              </li>
              {/* <li>
                <a href="/event">By Event</a>
              </li> */}
            </ul>
          </nav>
          <CurrentPage />
        </div>
      </main>
    </Provider>
  </React.StrictMode>,
  window.document.querySelector('#app'),
);
