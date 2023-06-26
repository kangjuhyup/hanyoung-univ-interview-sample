import styled from "styled-components";
import { TEXT } from "../const/voice.const";
import roundStore from "../store/round.store";

const ListPageBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow: auto;
  z-index: 9999;
`;

const ListPage = (props : {
    handlePage:any
}) => {
  const list: number[] = Array.from({ length: 20 }, (_, index) => index);
  const { setRound } = roundStore();
  const handleClick = (id: number) => {
    setRound(id);
  };
  return (
    <ListPageBody>
        <button onClick={()=>{props.handlePage(false)}}>닫기</button>
      <ul>
        {list.map((id) => (
          <li key={id}>
            <p>
              {id+1} : {TEXT[id]}
            </p>
            <button
              onClick={() => {
                handleClick(id);
                props.handlePage(false)
              }}
            >
              대답하기
            </button>
          </li>
        ))}
      </ul>
    </ListPageBody>
  );
};

export default ListPage;
