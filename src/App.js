import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { isEmpty } from 'lodash';

import Questions from './containers/questions/Questions';
import QuestionDetail from './containers/question_detail/QuestionDetail';
import CreateQuestion from './containers/create_question/CreateQuestion';
import * as actions from './redux/actions/actions';
import * as selectors from './redux/selectors';
import GlobalStyles from './App.style';

function App({ getQuestions, snackMessage, setSnackMessage }) {
  useEffect(() => {
    getQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const snackbarCloseHandler = () => setSnackMessage(null);

  return (
    <>
      <GlobalStyles />
      <SimpleBar style={{ height: '100vh' }}>
        <Switch>
          <Route path="/questions/create" component={CreateQuestion} />
          <Route path="/questions/:id" component={QuestionDetail} />
          <Route
            path="/questions"
            exact
            render={props => (
              <Questions {...props} callbackWhenError={getQuestions} />
            )}
          />
          <Route path="/null" exact component={null} />
          <Redirect to="/questions" />
        </Switch>
      </SimpleBar>
      <Snackbar
        open={!isEmpty(snackMessage)}
        autoHideDuration={5000}
        onClose={snackbarCloseHandler}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={snackMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={snackbarCloseHandler}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

const mapStateToProps = state => ({
  snackMessage: selectors.getSnackMessage(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(actions.getQuestions()),
  setSnackMessage: val => dispatch(actions.setSnackMessage(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
