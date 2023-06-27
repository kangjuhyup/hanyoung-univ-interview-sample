import { styled } from "styled-components";

const FirstPageBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
`;

const LogoImage = styled.img`
  position: absolute;
  top: 50px;
  width: 200px;
  height: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 40px;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #4e7fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #356eeb;
  }
`;

const FirstPage = (props: {
  startHandler: any,
}) => {
  return (
    <FirstPageBody>
      <LogoImage src={process.env.PUBLIC_URL + '/logo/hy.svg'} />
      <ButtonContainer>
        <StartButton onClick={() => props.startHandler(true)}>시작하기</StartButton>
      </ButtonContainer>
    </FirstPageBody>
  );
};

export default FirstPage;
