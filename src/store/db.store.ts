import { create } from "zustand";

export interface Data {
  index: number;
  text: string;
  file_path: string;
}

interface DB {
  isSetup: boolean;
  data: Data[];
  setDatabase: () => void;
  setData: (data:Data[]) => void;
}

const dbStore = create<DB>((set) => ({
  isSetup: true,
  data: [],
  setDatabase: () => {
    set((state) => ({
      ...state,
      isSetup: true,
    }));
  },
  
  setData: (data:Data[]) => {
    const { isSetup } = dbStore.getState();
    if (!isSetup ) {
      console.error("Database connection not set up.");
      throw new Error("Database connection not set up.");
    }
    set((state) => ({
      ...state,
      data
    }))    
  },

  pushData :(data:Data) => {
    const { isSetup, data:current } = dbStore.getState();
    if (!isSetup ) {
      console.error("Database connection not set up.");
      throw new Error("Database connection not set up.");
    }
    set((state) => ({
      ...state,
      data: [...current,data]
    }))
  }
}));

export default dbStore;
