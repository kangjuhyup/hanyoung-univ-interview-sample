import { useEffect } from "react";
import cameraStore from "../../store/camera.store";
import roundStore from "../../store/round.store";

const RoundController = () => {

  const {round,nextRound,prevRound} = roundStore();
  const {isEnd} = cameraStore();

  useEffect(()=> {
    if(isEnd) nextRound();
  },[isEnd])

  return {
    round,
    clickNextRound : nextRound,
    clickPrevRound : prevRound,
  };
};
export default RoundController;
