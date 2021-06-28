import styled from 'styled-components';

export const QuestionContainer = styled.div`
  width: 94%;
  height: 120px;
  border: 1px solid gray;
  margin: 10px 1%;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 20px;
  background: radial-gradient(inherit, bisque);
  cursor: pointer;
  color: cadetblue;

  & * {
    text-transform: capitalize;
    margin-bottom: 5px;
    font-size: 0.9em;
  }

  @media (min-width: 420px) {
    width: 48%;
  }

  @media (min-width: 736px) {
    width: 29%;
  }
`;
