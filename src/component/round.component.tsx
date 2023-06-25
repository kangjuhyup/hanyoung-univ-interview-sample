import styled from "styled-components";
import RoundController from "./controller/round.controller";

const RoundBody = styled.div`
    display: flex;
    flex-direction: row;
`

const RoundComponent = () => {
    const {round,clickNextRound,clickPrevRound} = RoundController();
    return (
        <RoundBody>
            <button onClick={clickPrevRound}>PREV</button>
            <p>{round}</p>
            <button onClick={clickNextRound}>NEXT</button>
        </RoundBody>
    )
}

export default RoundComponent;