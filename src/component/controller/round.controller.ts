import allStore from "../../store/all.store";

const RoundController = () => {
  const {round,forceStop} = allStore();


  const clickNextRound = () => {
    forceStop(round+1);
  }

  const clickPrevRound = () => {
    forceStop(round-1);
  }


  return {
    round,
    clickNextRound,
    clickPrevRound,
  };
};
export default RoundController;
