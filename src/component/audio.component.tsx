import { useEffect } from "react";
import AudioController from "./controller/audio.controller";


const AudioComponent = (props:{
    voiceSrc : string
}) => {
    const {audioRef,onPlay,onEnded,changeSource} = AudioController();



    useEffect(() => {
        changeSource(props.voiceSrc)
    },[props.voiceSrc])

    
  return (
    <audio ref={audioRef} controls onPlay={onPlay} onEnded={onEnded}>
    </audio>
  );
};

export default AudioComponent;
