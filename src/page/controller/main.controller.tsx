import { useEffect, useState } from "react";
import { TEXT, VOICE } from "../../const/voice.const";
import roundStore from "../../store/round.store";

const MainController = () => {
  const { round } = roundStore();
  const [ voiceSrc , setVoiceSrc ] = useState<string>('');
  const [ text, setText] = useState<string>('');

  useEffect(() => {
    console.log('maincoltroller : ', round);
    voiceSource();
  },[round])


  const voiceSource = () => {
    if(round === undefined) return;
    if(process.env.NODE_ENV === 'production') setVoiceSrc(`./voice/${round}.mp3`);
    else setVoiceSrc(`/voice/${round}.mp3`)
    setText(TEXT[round]);
  };


  return {
    voiceSrc,
    text,
  };
};

export default MainController;
