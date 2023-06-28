import { useState } from "react";
import AdminController from "./controller/admin.controller";
import { AdminBody, Button, InputDiv, InputFile, InputText } from "./style/admin.style";



const INPUT = {
  TEXT: "text",
  FILE: "file",
};

export type INPUT_TYPE = (typeof INPUT)[keyof typeof INPUT];

const AdminComponent = () => {
  const { datas, handleAddInput, handleInputChange, handleComplete } =
    AdminController();

  return (
    <AdminBody>
      {datas.map((value, index) => (
        <InputDiv key={index}>
          <InputText
            type="text"
            value={value.text}
            onChange={(e:any) =>
              handleInputChange(INPUT.TEXT, index, e.target.value)
            }
          />
          <InputFile
            type="file"
            accept=".mp3"
            value={value.file}
            onChange={(e:any) =>
              handleInputChange(INPUT.FILE, index, e.target.files?.[0])
            }
          />
        </InputDiv>
      ))}
      <Button onClick={handleAddInput}>+</Button>
      <Button onClick={handleComplete}>완료</Button>
    </AdminBody>
  );
};

export default AdminComponent;
