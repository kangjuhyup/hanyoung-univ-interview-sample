import { useState } from "react";
import dbStore from "../../store/db.store";
import { INPUT_TYPE } from "../admin.page";

const AdminController = () => {
  const [count, setCount] = useState(0);
  const [datas, setData] = useState<
    {
      text: string;
      file: any;
    }[]
  >(Array(count).fill({}));

  const {saveData} = dbStore();

  const handleInputChange = (type: INPUT_TYPE, index: number, value: any) => {
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
    setData(newData);
  };

  const handleAddInput = () => {
    setCount((prevCount) => prevCount + 1);
    setData((prevData) => [...prevData, { text: "", file: undefined }]);
  };

  const handleComplete = () => {
    if (process.env.NODE_ENV === "production") {
      const { ipcRenderer } = window.require("elctron");
      datas.map((data,index) => {
        ipcRenderer.send("saveVoice",{index,data:data.file})
        ipcRenderer.once("saveVoiceResponse", (event:any, result:any) => {
          if(result.success) {
            const filePath = result.path;
            saveData({index,text : data.text, file_path : filePath});
          }
        })
      })
    }
  };

  return {
    datas,
    handleAddInput,
    handleInputChange,
    handleComplete,
  };
};
export default AdminController;
