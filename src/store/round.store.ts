import { create } from "zustand";

interface Round {
  round: number;
  nextRound: () => void;
  prevRound: () => void;
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
}));

export default roundStore;
