import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import LabelVote from '../../components/LabelVote';
import * as actions from '../../redux/actions/actions';
import * as selectors from '../../redux/selectors';

const QuestionDetail = ({ detail = {}, getQuestionDetail }) => {
  const { id } = useParams();
  const { question, published_at: publishedAt, choices } = detail || {};

  useEffect(() => {
    getQuestionDetail(id);
  }, []);

  if (!detail) {
    return null;
  }

  return (
    <div>
      <h2>{question}</h2>
      {choices && choices.map(choice => <LabelVote choice={choice} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  detail: selectors.getQuestionDetail(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestionDetail: id => dispatch(actions.getQuestionDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
