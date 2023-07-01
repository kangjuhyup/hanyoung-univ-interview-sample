import AdminController from "./controller/admin.controller";
import { AdminBody, Button, InputDiv, InputFile, InputText } from "./style/admin.style";



const INPUT = {
  TEXT: "text",
  FILE: "file",
};

export type INPUT_TYPE = (typeof INPUT)[keyof typeof INPUT];

const AdminComponent = (props:{
  onClose: any,
}) => {
  const { datas, handleOnChange, handleInputChange, handleReset } =
    AdminController();

  return (
    <AdminBody>
      { datas && datas.map((value, index) => (
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
            // value={value.file_path}
            onChange={(e:any) =>
              handleInputChange(INPUT.FILE, index, e.target.files?.[0])
            }
          />
          <button onClick={() => handleOnChange(index)}>변경하기</button>
        </InputDiv>
      ))}
      {/* <Button onClick={handleAddInput(datas.length)}>+</Button> */}
      <Button onClick={()=>props.onClose(false)}>닫기</Button>
      <Button onClick={handleReset}>리셋</Button>
    </AdminBody>
  );
};

export default AdminComponent;
