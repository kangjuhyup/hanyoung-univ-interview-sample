import { create } from "zustand";

interface Data {
  index: number;
  text: string;
  file_path: string;
}

interface DB {
  isSetup: boolean;
  db: any;
  data: Data[];
  setDatabase: (db: any) => void;
  saveData: (new_data: Data) => boolean;
  setData: () => void;
}

const dbStore = create<DB>((set) => ({
  isSetup: true,
  db: undefined,
  data: [],
  setDatabase: (new_db) => {
    set((state) => ({
      ...state,
      db: new_db,
      isSetup: true,
    }));
  },
  saveData: (new_data: Data) => {
    const { index, text, file_path } = new_data;
    const { isSetup, db } = dbStore.getState();

    if (!isSetup || !db) {
      console.error("Database connection not set up.");
      return false;
    }

    db.run(
      "INSERT OR REPLACE INTO interview (index, text, file_path) VALUES (?, ?, ?)",
      [index, text, file_path],
      (err: any) => {
        if (err) {
          console.error(err);
          return false;
        }
      }
    );
    return true;
  },
  setData: () => {
    const { isSetup, db } = dbStore.getState();

    if (!isSetup || !db) {
      console.error("Database connection not set up.");
      throw new Error("Database connection not set up.");
    }

    db.all("SELECT * FROM interview", (err: any, rows: any[]) => {
      if (err) {
        console.error(err);
        return;
      }
      set((state) => ({
        ...state,
        data: rows,
      }));
    });
  },
}));

export default dbStore;
