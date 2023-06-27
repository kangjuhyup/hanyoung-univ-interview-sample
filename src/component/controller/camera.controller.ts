import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { TEXT } from "../../const/voice.const";
import allStore from "../../store/all.store";
export const CamearaController = () => {
  const {
    isCameraStart,
    cameraStart,
    cameraStop,
    isAudioStart,
    time,
    round,
    isSave,
    isFirst,
  } = allStore();

  const [hasWebcam, setWebcam] = useState(false);
  const [recoder, setRecoder] = useState<MediaRecorder>();
  const [remainingTime, setRemainingTime] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
  };

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      stopRecording();
    }
  }, [remainingTime]);

  // 카메라 시작 시 remainingTime 감소 시작.
  useEffect(() => {
    if (isCameraStart) {
      startInterval();
      return clearIntervalRef;
    }
  }, [isCameraStart]);

  // time 이 변경될 때 받아와 remainingTime 에 세팅
  useEffect(() => {
    if (isCameraStart || time === -1) {
      setRemainingTime(time);
    }
  }, [time]);

  // 음성 종료 후 녹화 시작 및 time 세팅
  useEffect(() => {
    if (!isAudioStart && !isFirst) {
      console.log('startRecording')
      startRecording();
    }
  }, [isAudioStart]);

  const checkWebcam = () => {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  };
  useEffect(() => {
    const webcam = checkWebcam();
    setWebcam(!!webcam);
  }, []);

  useEffect(() => {
    console.log('recoder : ' ,recoder)
  },[recoder])

  const webcamRef = useRef<Webcam>(null);

  const startRecording = () => {
    cameraStart();
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
          console.log('isSave : ' , isSave)
          // if (!isSave) return;
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

              ipcRenderer.on(
                "saveVideoResponse",
                (event: any, response: any) => {
                  if (response.success) {
                    console.log("파일 저장 완료");
                  } else {
                    console.error("파일 저장 실패 : ", response.error);
                  }
                }
              );
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

  useEffect(() => {
    if(!isCameraStart) {
      recoder?.stop();
    }
  },[isCameraStart])

  const stopRecording = () => {
    cameraStop();

  };

  return {
    hasWebcam,
    webcamRef,
    remainingTime,
  };
};

export default CamearaController;
