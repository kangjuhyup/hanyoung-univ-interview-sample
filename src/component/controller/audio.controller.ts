import { useRef } from "react";
import allStore from "../../store/all.store";


const AudioController = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const {
        audioStart,
        audioStop,
      } = allStore();

    const changeSource = (src:string) => {
        if (audioRef.current) {
          audioRef.current.src = src;
        }
    };

    const onPlay = () => {
        audioRef.current?.play();
        audioStart();
    }

    const onEnded = () => {
        audioStop()
    }

    return {
        audioRef,
        onPlay,
        onEnded,
        changeSource,
    };
};

export default AudioController;
