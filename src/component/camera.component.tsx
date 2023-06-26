import Webcam from "react-webcam";
import styled from "styled-components";
import CamearaController from "./controller/camera.controller";

const CameraCompoenentBody = styled.div`
    position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  /* width: 300px; */
  /* height: 300px; */
`;

const CameraCompoent = () => {
  const { webcamRef,time } = CamearaController();
  return (
    <CameraCompoenentBody>
        {time > 0 ? <p style={{position:"absolute",top:"0px"}}>남은시간 : {time}</p> : <></> }
      <Webcam style={{ width:'400px',height:'400px'}} audio={true} ref={webcamRef} mirrored={true} />
    </CameraCompoenentBody>
  );
};
export default CameraCompoent;
