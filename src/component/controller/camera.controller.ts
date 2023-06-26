import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { TEXT } from "../../const/voice.const";
import cameraStore from "../../store/camera.store";
import roundStore from "../../store/round.store";
import voiceStore from "../../store/voice.store";

export const CamearaController = () => {
  const [hasWebcam, setWebcam] = useState(false);
  const { isEnd: voiceEnd } = voiceStore();
  const { round } = roundStore();
  const { isStart: cameraStart, start, stop } = cameraStore();
  const [recoder, setRecoder] = useState<MediaRecorder>();
  const [time, setTime] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  };

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (cameraStart) {
      startInterval();
      return clearIntervalRef;
    }
  }, [cameraStart]);

  useEffect(() => {
    if (time === 0) {
      stopRecording();
      clearIntervalRef();
    }
  }, [time]);

  useEffect(() => {
    if (voiceEnd) {
      setTime(10);
      startRecording();
    }
  }, [voiceEnd]);

  const checkWebcam = () => {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  };
  useEffect(() => {
    const webcam = checkWebcam();
    setWebcam(!!webcam);
  }, []);

  const webcamRef = useRef<Webcam>(null);

  const startRecording = () => {
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

          if (process.env.NODE_ENV === "production") {
            const { ipcRenderer } = window.require("electron");
            const reader = new FileReader();
            reader.onloadend = () => {
              const buffer = reader.result;
              const arrayBuffer = buffer != null ? buffer : new ArrayBuffer(0);

              ipcRenderer.send("saveVideo", {
                name: `${TEXT[round]}.webm`,
                data: arrayBuffer,
              });

              ipcRenderer.on("saveVideoResponse", (event:any, response:any) => {
                if (response.success) {
                  console.log("파일 저장 완료");
                } else {
                  console.error("파일 저장 실패 : " , response.error);
                }
              });
            };

            reader.readAsArrayBuffer(blob);
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.href = url;
            a.download = `${TEXT[round]}.webm`;
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        };

        mediaRecorder.start();
        setRecoder(mediaRecorder);
      }
    }
  };

  const stopRecording = () => {
    stop();
    recoder?.stop();
  };

  return {
    hasWebcam,
    webcamRef,
    time,
  };
};

export default CamearaController;
