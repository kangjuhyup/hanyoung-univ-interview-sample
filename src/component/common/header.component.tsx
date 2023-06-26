import { useEffect, useState } from "react";
import styled from "styled-components";
import ListPage from "../../page/list.page";

const Header = styled.div`
  position: relative;
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: aqua;
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
