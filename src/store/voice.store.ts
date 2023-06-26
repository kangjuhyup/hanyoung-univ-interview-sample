import { create } from "zustand";

interface Voice {
  isStart: boolean;
  isEnd : boolean;
  start: () => void;
  stop: () => void;
}

const voiceStore = create<Voice>((set) => ({
  isStart: false,
  isEnd : false,
  start: () => {
    set((state) => ({
      isStart: true,
      isEnd : false
    }));
  },
  stop: () => {
    set((state) => ({
      isStart: false,
      isEnd : true,
    }));
  },
}));

export default voiceStore;
