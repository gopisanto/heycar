import styled from 'styled-components';

export default styled.div`
  width: 90%;
  height: 100px;
  border: 1px solid gray;
  margin: 10px auto;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 20px;
  background-color: lightgreen;
  cursor: pointer;

  & * {
    font-size: 1em;
    text-transform: capitalize;
    margin: 0;
  }
`;
