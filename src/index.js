import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import history from './redux/history';
import './index.css';
import store from './redux/store';
import App from './App';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { showLoader } from './redux/actions/actions';
import { injectLoaderActionToAxiosInterceptor } from './api';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// inject showLoader action, so that axios interceptor will trigger
// for every request and response.
// doing it like this will decouple axios interceptor with action if directly imported and used.
injectLoaderActionToAxiosInterceptor(
  bindActionCreators({ showLoader }, store.dispatch)
);
const channel4Broadcast = new BroadcastChannel('channel4');
channel4Broadcast.onmessage = event => {
  console.log(`message ${event.data.offline}`);
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(reg => console.log(`Service worker registered for ${reg.scope}`))
    .catch(err => console.log(`Failed to register Service worker:- ${err}`));

  navigator.serviceWorker.addEventListener('message', event => {
    console.log(event.data.msg, event.data.url);
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
