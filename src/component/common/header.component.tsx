import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: aqua;
`

const HeaderComponent = () => {
    return(
        <Header>
            <img src={process.env.PUBLIC_URL+'/logo/logo_basic.jpg'}/>
            <p style={{fontSize:"40px", color:"white", fontWeight:"bold"}}>HYU-INTERVIEW 면접 프로그램</p>
        </Header>
    )
}

export default HeaderComponent;