import allStore from "../../store/all.store";

const RoundController = () => {
  const {round,forceStop} = allStore();


  const clickNextRound = () => {
    if(round === 19) return;
    forceStop(round+1);
  }

  const clickPrevRound = () => {
    if(round === 0 ) return;
    forceStop(round-1);
  }


  return {
    round,
    clickNextRound,
    clickPrevRound,
  };
};
export default RoundController;
