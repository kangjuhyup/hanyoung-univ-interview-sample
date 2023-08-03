import { useEffect, useState } from "react";
import allStore from "../../store/all.store";
import dbStore from "../../store/db.store";

const MainController = () => {
  const { round } = allStore();
  const [voiceSrc, setVoiceSrc] = useState<{
    isChanged: boolean;
    src: string;
  }>({
    isChanged: false,
    src: "",
  });
  const [text, setText] = useState<string>("");
  const { data: dbData, isSetup: dbSetup } = dbStore();
  useEffect(() => {
    console.log('changeRound : ', round)
    voiceSource(false);
    if (process.env.NODE_ENV === "production") {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.on("saveVoiceResponse", (event: any, result: any) => {
        console.log("saveVoiceResponse : ", result);
        if (result.success) {
          console.log("변경성공 : " , round);
          voiceSource(true);
        }
      });
    }
  }, [round]);


  const voiceSource = (isChanged: boolean) => {
    console.log('voiceSource : ',round)
    if (round === undefined) return;
    if (!dbSetup) return;
    setText(dbData[round].text);
    if (process.env.NODE_ENV === "production") setVoiceSrc({ isChanged, src: dbData[round].file_path });
    else setVoiceSrc({ isChanged: false, src: `/voice/${round}.mp3` });
  };

  return {
    voiceSrc,
    text,
  };
};

export default MainController;
