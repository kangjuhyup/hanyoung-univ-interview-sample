import { useEffect, useState } from "react";
import dbStore from "../../store/db.store";
import { INPUT_TYPE } from "../admin.page";

interface Data {
  index: number;
  text: string;
  file_path: string;
  file?: File;
}

const AdminController = () => {
  const { data: currentDatas, setData } = dbStore();
  const [datas, setDatas] = useState<Data[]>([]);

  useEffect(() => {
    setDatas(currentDatas);
  }, [currentDatas]);

  const handleInputChange = (type: INPUT_TYPE, index: number, value: any) => {
    console.log('handleInputChange : ',index)
    const newData = [...datas];
    if (type === "text") {
      newData[index] = {
        ...newData[index],
        text: value,
      };
    }
    if (type === "file") {
      newData[index] = {
        ...newData[index],
        file: value,
      };
    }
    setDatas(newData);
  };

  const handleOnChange = (index: number) => {
    const { file, text } = datas[index];
    if (process.env.NODE_ENV === "production") {
      console.log("handleOnChange : ", file);
      const reader = new FileReader();
      reader.onload = () => {
        const fileBuffer = Buffer.from(reader.result as ArrayBuffer);
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("saveVoice", { index, data: fileBuffer });
        ipcRenderer.once("saveVoiceResponse", (event: any, result: any) => {
          console.log('saveVoiceResponse : ' , result);
          if (result.success) {
            ipcRenderer.send("upsertOne", { index, text });
            ipcRenderer.once("upsertOneResponse", (event: any, result: any) => {
              console.log('upsertOneResponse : ' , result)
              if (result.success) {
                alert("변경성공");
              }
              ipcRenderer.send("selectAll");
              ipcRenderer.on('selectAllResponse',(event:any,response:{success:boolean,data:Data[]}) => {
                setData(response.data);
              })
            });
          }
        });
      };
      if(file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleReset = () => {
    if (process.env.NODE_ENV === "production") {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("reset");
      ipcRenderer.once("resetResponse", () => {
        alert('초기화 성공');
        ipcRenderer.send("selectAll");
      });
    }
  };

  return {
    datas,
    handleInputChange,
    handleReset,
    handleOnChange,
  };
};
export default AdminController;
