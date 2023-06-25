import { create } from "zustand";

interface Camera {
  isStart: boolean;
  isEnd : boolean;
  start: () => void;
  stop: () => void;
}

const cameraStore = create<Camera>((set) => ({
  isStart: false,
  isEnd : false,
  start: () => {
    set((state) => ({
      isStart: true,
      isEnd : false,
    }));
  },
  stop: () => {
    set((state) => ({
      isStart: false,
      isEnd : true,
    }));
  },
}));

export default cameraStore;
