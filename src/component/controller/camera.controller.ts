import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import cameraStore from "../../store/camera.store";
import voiceStore from "../../store/voice.store";

export const CamearaController = () => {

  const {isEnd} = voiceStore();
  const {start,stop} = cameraStore();

  useEffect(() => {
    if(isEnd) {
      startRecording(10000);
    }
  },[isEnd]);

  const webcamRef = useRef<Webcam>(null);

  const startRecording = (time:number) => {
    start();
    if (webcamRef.current) {
      const videoElem = webcamRef.current.video as HTMLVideoElement;
      const mediaStream = videoElem.srcObject as MediaStream;

      if (mediaStream) {
        const mediaRecorder = new MediaRecorder(mediaStream);
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.href = url;
          a.download = "recorded-video.webm";
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        };

        mediaRecorder.start();
        setTimeout(() => {
          stop();
          mediaRecorder.stop();
        }, time); 
      }
    }
  };

  const stopRecording = () => {
    if (webcamRef.current) {
      const videoElem = webcamRef.current.video as HTMLVideoElement;
      const mediaStream = videoElem.srcObject as MediaStream;
  
      if (mediaStream) {
        const mediaTracks = mediaStream.getTracks();
        mediaTracks.forEach((track) => {
          track.stop();
        });
      }
    }
  };

  return {
    webcamRef,
    
  };
};
export default CamearaController;
