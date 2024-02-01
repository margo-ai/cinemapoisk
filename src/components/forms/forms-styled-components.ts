import styled from 'styled-components';

export const FormStyled = styled.form`
  display: grid;
  row-gap: 2em;
  justify-content: center;
`;

export const FormItemStyled = styled.div`
  position: relative;
  width: 280px;
`;

export const FormErrorStyled = styled.div`
  position: absolute;
  top: 44px;
  left: 12px;
  color: red;
  font-size: x-small;
`;
