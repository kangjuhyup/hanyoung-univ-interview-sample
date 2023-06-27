import Webcam from "react-webcam";
import styled from "styled-components";
import CamearaController from "./controller/camera.controller";

const CameraComponentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: auto;
`;

const CameraCompoent = () => {
  const { hasWebcam, webcamRef,remainingTime } = CamearaController();
  return (
    <CameraComponentBody>
        {remainingTime > 0 ? <p style={{position:"absolute",top:"0px"}}>남은시간 : {remainingTime}</p> : <></> }
        {hasWebcam ? (
        <Webcam style={{ width: '400px', height: '400px' }} audio={true} ref={webcamRef} mirrored={true} />
      ) : (
        <p>웹캠을 지원하지 않는 기기입니다.</p>
      )}
    </CameraComponentBody>
  );
};
export default CameraCompoent;
