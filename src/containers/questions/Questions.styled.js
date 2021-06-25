import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-flow: column nowrap;
  padding: 5px;

  & > h2 {
    margin: 10px auto;
    font-size: 1rem;
  }

  & .create {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;

    & label {
      font-size: 0.9em;
    }
  }

  & .createIcon {
    color: cadetblue;
    font-size: 1.5em;
    cursor: pointer;
  }
`;

export const QuestionsContainer = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  max-width: 100vw;

  @media (min-width: 420px) {
    flex-flow: row wrap;
  }
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: 420px) {
    & > label {
      font-size: 1.3em;
    }
  }
`;
