import styled from "styled-components";
import AudioComponent from "../component/audio.component";
import CameraCompoent from "../component/camera.component";
import RoundComponent from "../component/round.component";
import MainController from "./controller/main.controller";

const MainPageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap : 40px;
`;

const MainPage = () => {
    const { voiceSrc }= MainController();
  return (
    <MainPageBody>
      <RoundComponent/>
      <AudioComponent voiceSrc={voiceSrc} />
      <CameraCompoent/>
    </MainPageBody>
  );
};

export default MainPage;
