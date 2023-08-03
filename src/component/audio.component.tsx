import { useEffect } from "react";
import styled from "styled-components";
import AudioController from "./controller/audio.controller";

const AudioComponentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AudioComponent = (props: { voiceSrc: {isChanged:boolean,src:string}; text: string }) => {
  const { audioRef, onPlay, onEnded } = AudioController();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src=""; // empty source
      audioRef.current.src = `${props.voiceSrc.src}?${Date.now()}`;
    }
  }, [audioRef, props.voiceSrc]);



  return (
    <AudioComponentBody>
      <audio ref={audioRef} onEnded={onEnded}/>
      <button
        onClick={onPlay}
        style={{
          background: "transparent",
          width: "40px",
          border: "none",
          outline: "none",
        }}
      >
        <img src={process.env.PUBLIC_URL+'/icons/start.svg'} />
      </button>

      <p>{props.text}</p>
    </AudioComponentBody>
  );
};

export default AudioComponent;
