import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { isEmpty } from 'lodash';

import Loader from './components/Loader';
import * as actions from './redux/actions/actions';
import * as selectors from './redux/selectors';
import GlobalStyles from './App.style';

const Questions = lazy(() => import('./containers/questions/Questions'));

const QuestionDetail = lazy(() =>
  import('./containers/question_detail/QuestionDetail')
);
const CreateQuestion = lazy(() =>
  import('./containers/create_question/CreateQuestion')
);

function App({ getQuestions, snackMessage, setSnackMessage, showLoader }) {
  useEffect(() => {
    getQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const snackbarCloseHandler = () => setSnackMessage(null);

  return (
    <>
      <Loader show={showLoader} />
      <GlobalStyles />
      <SimpleBar style={{ height: '100vh' }}>
        <Suspense
          fallback={<Loader show msg="Please wait while screen loads!" />}
        >
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
        </Suspense>
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
  showLoader: selectors.getShowLoader(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(actions.getQuestions()),
  setSnackMessage: val => dispatch(actions.setSnackMessage(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
