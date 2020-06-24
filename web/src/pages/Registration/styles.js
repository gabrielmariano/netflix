import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 40px auto;
`;

export const Form = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    padding: 10px;
    border-radius: 4px;
    padding-right: 5px;
    margin-top: 10px;
    width: 300px;
    border: 0;
    border: 1px solid #ccc;
`;

export const Button = styled.button`
    border: none;
    background: red;
    color: #fff;
    height: 45px;
    width: 300px;
    font-weight: bold;
    border-radius: 4px;
    margin-top: 10px;
`;
