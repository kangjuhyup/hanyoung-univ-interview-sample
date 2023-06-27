import styled from "styled-components";
import { TEXT } from "../const/voice.const";
import allStore from "../store/all.store";

const ListPageBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  max-height: 600px;
  overflow: auto;
  z-index: 9999;
`;

const CloseButton = styled.button`
  background-color: #4e7fff;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2653ff;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #333333;

  .list-text {
    margin: 0;
    flex-grow: 1;
  }

  .answer {
    font-size: 14px;
    margin-left: 16px;
    background-color: #4e7fff;
    color: #ffffff;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2653ff;
    }
  }
`;

const ListPage = (props: { handlePage: any }) => {
  const list: number[] = Array.from({ length: 20 }, (_, index) => index);
  const { forceStop } = allStore();
  const handleClick = (id: number) => {
    forceStop(id);
  };

  return (
    <ListPageBody>
      <CloseButton
        onClick={() => {
          props.handlePage(false);
        }}
      >
        닫기
      </CloseButton>
      <ul>
        {list.map((id) => (
          <ListItem key={id}>
            <p className="list-text">
              {id + 1} : {TEXT[id]}
            </p>
            <button
              className="answer"
              onClick={() => {
                handleClick(id);
                props.handlePage(false);
              }}
            >
              대답하기
            </button>
          </ListItem>
        ))}
      </ul>
    </ListPageBody>
  );
};

export default ListPage;
