import styled from 'styled-components';

export default styled.button`
  background-color: ${props => (props.disabled ? 'gray' : 'cadetblue')};
  border-radius: 10px;
  border: 1px solid cadetblue;
  padding: 5px 10px;
  cursor: pointer;
`;
