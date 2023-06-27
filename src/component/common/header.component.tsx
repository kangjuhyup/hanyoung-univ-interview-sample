import { useEffect, useState } from "react";
import styled from "styled-components";
import ListPage from "../../page/list.page";

const Header = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #4e7fff;
  padding: 20px;

  .img {
    width: 250px;
    height: 80px;
    margin-right: 16px;
  }

  .p {
    font-size: 24px;
    color: #ffffff;
    font-weight: bold;
  }

  .button {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: transparent;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform 0.3s ease;

    .img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;



const HeaderComponent = () => {
  const [isOpenList, setOpenList] = useState(false);
  return (
    <Header>
      <img src={process.env.PUBLIC_URL + "/logo/logo_basic.jpg"} />
      <p style={{ fontSize: "40px", color: "white", fontWeight: "bold" }}>
        HYU-INTERVIEW 면접 프로그램
      </p>
      <button
        style={{
          position: "absolute",
          right: "10px",
          background: "transparent",
          width: "40px",
          border: "none",
          outline: "none",
        }}
        onClick={() => {
            setOpenList(!isOpenList);
        }}
      >
        <img src={process.env.PUBLIC_URL + "/icons/list.svg"} />
      </button>
      {isOpenList ? <ListPage handlePage={setOpenList}/> : <></>}
    </Header>
  );
};

export default HeaderComponent;
