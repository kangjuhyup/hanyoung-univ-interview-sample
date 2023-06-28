import { create } from "zustand";

interface DB {
  isSetup: boolean;
  db: any;
  setDatabase: (db: any) => void;
  saveData: (data: {
    index: number;
    text: string;
    file_path: string;
  }) => boolean;
}

const dbStore = create<DB>((set) => ({
  isSetup: true,
  db: undefined,
  setDatabase: (new_db) => {
    set((state) => ({
      db: new_db,
      isSetup: true,
    }));
  },
  saveData: (data: { index: number; text: string; file_path: string }) => {
    const { index, text, file_path } = data;
    if (!dbStore.getState().isSetup || !dbStore.getState().db) {
      console.error("Database connection not set up.");
      return false;
    }

    const db = dbStore.getState().db;
    db.run(
      "INSERT OR REPLACE INTO interview (index, text, file_path) VALUES (?, ?, ?)",
      [index, text, file_path],
      (err: any) => {
        if (err) throw err;
      }
    );
    return true;
  },
}));

export default dbStore;
