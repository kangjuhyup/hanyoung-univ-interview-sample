import { ButtonContainer, FirstPageBody, LogoImage, StartButton } from "./style/first.style";



const FirstPage = (props: {
  startHandler: any,
  isInit: boolean,
}) => {
  return (
    <FirstPageBody>
      <LogoImage src={process.env.PUBLIC_URL + '/logo/hy.svg'} />
      <ButtonContainer>
        <StartButton onClick={() => { props.startHandler(true) }}>{props.isInit ? '시작하기' : '로딩...'}</StartButton>
      </ButtonContainer>
    </FirstPageBody>
  );
};

export default FirstPage;
