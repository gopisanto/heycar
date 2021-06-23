import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import store from './redux/store';
import Questions from './containers/questions/Questions';
import QuestionDetail from './containers/question_detail/QuestionDetail';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SimpleBar style={{ height: '100vh' }}>
          <Switch>
            <Route path="/questions/:id" component={QuestionDetail} />
            <Route path="/" component={Questions} />
            <Redirect to="/" />
          </Switch>
        </SimpleBar>
      </Router>
    </Provider>
  );
}

export default App;
