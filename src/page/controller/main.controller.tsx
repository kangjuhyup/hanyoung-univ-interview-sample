import { useEffect, useState } from "react";
import { TEXT, VOICE } from "../../const/voice.const";
import allStore from "../../store/all.store";
import dbStore from "../../store/db.store";

const MainController = () => {
  const { round } = allStore();
  const [ voiceSrc , setVoiceSrc ] = useState<string>('');
  const [ text, setText] = useState<string>('');
  const { data:dbData, isSetup:dbSetup } = dbStore();


  useEffect(() => {
    voiceSource();
  },[round])


  const voiceSource = () => {
    if(round === undefined) return;
    if(!dbSetup) return;
    setText(dbData[round].text);    
    if(process.env.NODE_ENV === 'production') setVoiceSrc(dbData[round].file_path);
    else setVoiceSrc(`/voice/${round}.mp3`);    
  };


  return {
    voiceSrc,
    text,
  };
};

export default MainController;
