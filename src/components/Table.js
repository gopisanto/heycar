import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid cadetblue;
  padding: 0px;
`;

export const Row = styled.div`
  display: flex;
  min-height: 20px;
  align-content: center;
  border-bottom: 1px solid cadetblue;
`;

export const Col = styled.div`
  flex: ${props => props.flex || 1};
  padding: 0.5em;
  align-self: center;
  text-align: ${props => props.align || 'center'};
`;
