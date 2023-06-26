import styled from "styled-components";
import RoundController from "./controller/round.controller";

const RoundBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoundComponent = () => {
  const { round, clickNextRound, clickPrevRound } = RoundController();
  return (
    <RoundBody>
      {
          round !== 20 ?
          <>
          <button
        style={{
          background: "transparent",
          width: "40px",
          border: "none",
          outline: "none",
        }}
        onClick={clickPrevRound}
      >
        <img
          src={process.env.PUBLIC_URL+'/icons/arrow.svg'}
          style={{ rotate: "180deg" }}
        />
      </button>
      <p>{round + 1}</p>
      <button
        style={{
          background: "transparent",
          width: "40px",
          border: "none",
          outline: "none",
        }}
        onClick={clickNextRound}
      >
        <img src={process.env.PUBLIC_URL+'/icons/arrow.svg'} />
      </button>
      </>
      :<><p>면접이 종료되었습니다. 수고하셨습니다.</p></>}
    </RoundBody>
  );
};

export default RoundComponent;
