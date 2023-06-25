import Webcam from "react-webcam";
import styled from "styled-components";
import CamearaController from "./controller/camera.controller";

const CameraCompoenentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CameraCompoent = () => {
  const { webcamRef } = CamearaController();
  return (
    <CameraCompoenentBody>
      <Webcam audio={true} ref={webcamRef} mirrored={true} />
    </CameraCompoenentBody>
  );
};
export default CameraCompoent;
