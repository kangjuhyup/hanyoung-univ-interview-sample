import { ButtonContainer, FirstPageBody, LogoImage, StartButton } from "./style/first.style";



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
