import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CreateQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  max-width: 100%;
  padding: 10px;
  align-items: flex-start;
  box-sizing: border-box;

  & * {
    margin-bottom: 10px;
  }

  & h2 {
    align-self: center;
    margin-bottom: 20px;
  }

  & button {
    align-self: flex-end;
  }

  @media (min-width: 420px) {
    max-width: 420px;
    min-width: 420px;
    margin: 0 auto;
  }
`;

export const Close = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: cadetblue;
`;
