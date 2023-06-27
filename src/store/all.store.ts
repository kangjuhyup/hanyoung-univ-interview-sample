import { create } from "zustand";

interface All {
  isFirst:boolean,
  isCameraStart: boolean;
  isAudioStart: boolean;
  round : number;
  time: number;
  isSave: boolean;
  cameraStart(): void;
  cameraStop(): void;
  audioStart(): void;
  audioStop(): void;
  forceStop(new_round:number): void;
}

const allStore = create<All>((set) => ({
  isFirst:true,
  isCameraStart: false,
  isAudioStart: false,
  round : 0,
  time: -1,
  isSave : true,
  cameraStart: () => {
    set((state) => ({
      ...state,
      isSave:true,
      isCameraStart: true,
      time: 60,
    }));
  },
  cameraStop: () => {
    set((state) => ({
      ...state,
      isCameraStart: false,
      round : state.round+1,
      time: -1,
      isFirst : true,
    }));
  },
  audioStart: () => {
    set((state) => ({
      ...state,
      isAudioStart: true,
      time: -1,
    }));
  },
  audioStop: () => {
    set((state) => ({
      ...state,
      isAudioStart: false,
      time: -1,
      isFirst:false,

    }));
  },
  forceStop: (new_round:number) => {
    set((state) => ({
      ...state,
      isAudioStart: false,
      isCameraStart: false,
      time: -1,
      round : new_round,
      isSave : false,
      isFirst : true,
    }));
  },
}));

export default allStore;
