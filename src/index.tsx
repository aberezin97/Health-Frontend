import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import store, { persistor } from 'store';
import App from './App';
import 'react-bootstrap-typeahead/css/Typeahead.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '@tabler/core/dist/css/tabler.min.css';
import '@tabler/core/dist/css/tabler-flags.min.css';
import '@tabler/core/dist/css/tabler-vendors.min.css';
import './index.css';
import './i18n';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : 'http://192.168.1.3:8000';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
