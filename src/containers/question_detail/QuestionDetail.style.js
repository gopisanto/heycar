import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  min-width: 100%;
  max-width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;

  & h2 {
    font-size: 1em;
    margin: 15px auto;
    color: cadetblue;
  }

  & a {
    font-size: 1em;
    margin: 15px 10px;
    color: cadetblue;
  }

  & button {
    align-self: flex-end;
    margin-top: 15px;
  }

  & > * {
    margin-bottom: 15px;
  }

  @media (min-width: 420px) {
    min-width: 500px;
    max-width: 500px;
    margin: 0 auto;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const GoBack = styled(ArrowBackIcon)`
  cursor: pointer;
`;
