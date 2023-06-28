import { styled } from "styled-components";

export const AdminBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  max-height: 600px;
  overflow: auto;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const InputText = styled.input`
  flex : 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const InputFile = styled.input`
  flex : 0.5;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #4e7fff;
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: #356bcc;
  }
`;