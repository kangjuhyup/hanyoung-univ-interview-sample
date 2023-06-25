import { useEffect, useState } from "react";
import { VOICE } from "../../const/voice.const";
import roundStore from "../../store/round.store";
// import { ipcRenderer } from "electron";

const MainController = () => {
  const { round } = roundStore();
  const [ voiceSrc , setVoiceSrc ] = useState<string>('');

  useEffect(() => {
    voiceSource();
  },[round])
  const voiceSource = () => {
    let name;
    switch (round) {
      case 0:
        name = VOICE["INTRODUCE"];
        break;
      case 1:
        name = VOICE["BOOK_OR_MOVIE"];
        break;
      case 2:
        name = VOICE["FREIND"];
        break;
      case 3:
        name = VOICE["RESPECT_PERSON"];
        break;
      default:
        name = VOICE["INTRODUCE"];
        break;
    }
      setVoiceSrc(`./voice/${name}.m4a`);
  };
  return {
    voiceSrc,
  };
};

export default MainController;
