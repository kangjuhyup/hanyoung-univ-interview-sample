import styled from "styled-components";

const FirstPageBody = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`

const FirstPage = (props:{
    startHandler : any,
}) => {

    return (
        <FirstPageBody>
        <img style={ { position:'absolute', top :'50px',width : '200px', height: '200px'}  } src={process.env.PUBLIC_URL+'/logo/hy.svg'} />
        <div style={{display:'flex', flexDirection:'row', gap:'40px'}}>
            <button onClick={() =>props.startHandler(true)}>시작하기</button>
        </div>
        </FirstPageBody>
    )
};

export default FirstPage;