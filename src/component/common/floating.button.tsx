import { isVisible } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { styled } from "styled-components";
import AdminComponent from "../../page/admin.page";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4e7fff;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Floating = (props: { children: any }) => {
  const [isVisible, setVisible] = useState(false);

  const clickHandler = () => {
    setVisible(true);
  };
  return (
    <>
      <FloatingButton onClick={clickHandler}>{props.children}</FloatingButton>
      {isVisible ? <AdminComponent onClose={setVisible}/> : <></>}
    </>
  );
};

export default Floating;
