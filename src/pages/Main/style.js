import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  padding: 0 10px 0 10px;

  input {
    flex: 1;
    height: 45px;
    padding: 0 20px;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
    border: ${props => (props.withError ? '2px red solid' : '0.5px solid dodgerblue')};
    background: 0;
  }
  button {
    padding: 0 20px;
    border: 0;
    background: dodgerblue;
    border-radius: 3px;
    margin-left: 5px;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
`;
