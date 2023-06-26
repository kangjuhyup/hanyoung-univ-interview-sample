import { create } from "zustand";

interface Round {
  round: number;
  nextRound: () => void;
  prevRound: () => void;
  setRound : (new_round:number) => void;
}

const roundStore = create<Round>((set) => ({
  round: 0,
  nextRound: () => {
    set((state) => ({
      round: state.round+1,
    }));
  },
  prevRound: () => {
    set((state) => ({
      round: state.round-1,
    }));
  },
  setRound: (new_round:number) => {
    set((state) => ({
      round : new_round
    }))
  }
}));

export default roundStore;
