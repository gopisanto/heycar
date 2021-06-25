import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Questions from './containers/questions/Questions';
import QuestionDetail from './containers/question_detail/QuestionDetail';
import CreateQuestion from './containers/create_question/CreateQuestion';
import * as actions from './redux/actions/actions';
import * as selectors from './redux/selectors';
import GlobalStyles from './App.style';

function App({ getQuestions, showSnackbar, snackMessage, toggleSnackbar }) {
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <GlobalStyles />
      <SimpleBar style={{ height: '100vh' }}>
        <Switch>
          <Route path="/questions/create" component={CreateQuestion} />
          <Route path="/questions/:id" component={QuestionDetail} />
          <Route path="/questions" exact component={Questions} />
          <Redirect to="/questions" />
        </Switch>
      </SimpleBar>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={toggleSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={snackMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={toggleSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

const mapStateToProps = state => ({
  showSnackbar: selectors.getShowSnackbar(state),
  snackMessage: selectors.getSnackMessage(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(actions.getQuestions()),
  toggleSnackbar: () => dispatch(actions.toggleSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
