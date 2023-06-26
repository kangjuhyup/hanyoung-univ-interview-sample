import { useRef } from "react";
import voiceStore from "../../store/voice.store";


const AudioController = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { start,stop } = voiceStore();

    const changeSource = (src:string) => {
        if (audioRef.current) {
          audioRef.current.src = src;
        }
    };

    const onPlay = () => {
        audioRef.current?.play();
        start();
    }

    const onEnded = () => {
        stop()
    }

    return {
        audioRef,
        onPlay,
        onEnded,
        changeSource,
    };
};

export default AudioController;
