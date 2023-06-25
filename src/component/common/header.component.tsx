import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: row;
    background-color: aqua;
`

const HeaderComponent = () => {
    const [logo,setLogo] = useState('');
    useEffect(() => {
        setLogo('/logo/logo_basic.jpg')
    },[])
    return(
        <Header>
            <img src={process.env.PUBLIC_URL+logo}/>
            <p>면접</p>
        </Header>
    )
}

export default HeaderComponent;