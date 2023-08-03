import { useEffect, useState } from "react";
import { TEXT, VOICE } from "../../const/voice.const";
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
    voiceSource(false);
  }, [round]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.on("saveVoiceResponse", (event: any, result: any) => {
        if (result.success) {
          voiceSource(true);
        }
      });
    }
  }, []);

  const voiceSource = (isChanged: boolean) => {
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
