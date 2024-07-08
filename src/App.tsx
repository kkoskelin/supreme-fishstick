import './types/images.d.ts';
import { CurrentPage } from './components/CurrentPage';
import { Provider } from 'overmind-react';
import { overmindApp } from './presenter/presenter';
import logo from './MadisonSwimming-Logo-Small.webp';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmindApp}>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <img
            className="mx-auto h-16 inline w-auto"
            src={logo}
            alt="Madison Swimming Logo" />
          {/* <div className="mx-auto w-128 text-left text-red-500">
            <a href="https://www.madisonswimming.com/" className="!text-red-600 hover:!text-red-900">
            <img
              className="mx-auto h-16 inline w-auto"
              src={logo}
              alt="Madison Swimming Logo" />&lt; go back to Madison Swimming</a>
          </div> */}
          <hr className="my-8" />
          {/* <nav className="mb-4">
            Search:
            <ul>
              <li>
                <a href="/swimmer">By Swimmer</a>
              </li>
              <li>
                <a href="/event">By Event</a>
              </li>
            </ul>
          </nav> */}
          <CurrentPage />
        </div>
      </main>
    </Provider>
  </React.StrictMode >,
  window.document.querySelector('#app'),
);
