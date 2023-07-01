import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import {dbFilePath} from './electron';

const TEXT = {
  0: '1분간 자기소개를 해보세요.',
  1: '자신의 장점과 단점에 대하여 이야기해 보세요.',
  2: '친구와의 갈등 경험 및 해결 방법, 그리고 느낀점을 말씀해주세요.',
  3: '가장 힘들었던/보람있었던 경험을 말씀해주세요.',
  4: '최근에 읽은 책이나 영화가 있다면 간단히 이야기해 주세요.',
  5: '가장 존경하는 인물은 누구입니까? 그리고 이유에 대하여 말씀해주세요.',
  6: '본인이 추구하는 가치나 생활신조, 인생관, 좌우명은 무엇입니까?',
  7: '리더십을 발휘한 경험이 있으시면 말씀해주세요.',
  8: '지금까지 살면서 실패 경험이 있다면 말씀해주세요.',
  9: '인생에서 가장 큰 성공은 무엇이었나요?',
  10: '혼자 하는 일과 함께 하는 일 중 어떤 것을 더 선호하나요? 그리고 이유에 대하여 말씀해주세요.',
  11: '직장을 고를 때 가장 중요하게 생각하는 것이 무엇인가요?',
  12: '화가 나거나 힘들 때 어떤 방법으로 스트레스를 해소하나요?',
  13: '인생에서 위기가 있었나요? 있었다면 극복 방법을 말씀해주세요.',
  14: '나이 차이가 많이 나는 사람과 대화하면서 어려움을 느낀 경험이 있나요? 그 때 대화를 어떻게 풀어갔나요?',
  15: '본인의 취미나 특기는 무엇입니까?',
  16: '자기개발을 위해 무엇을 합니까?',
  17: '회사에서 갑자기 원하지 않는 부서로 발령을 낸다면 어떻게 할 건가요?',
  18: '상사가 부당한 지시를 한다면 어떻게 할 건가요?',
  19: '업무가 적성에 맞지 않거나 과중하다고 생각되면 어떻게 할 건가요?',
};

type TEXT = typeof TEXT[keyof typeof TEXT];

export interface Colume {
  idx: number,
  text : string,
  file_path : string,
}



class AdminDatabase {
  private static instance: AdminDatabase;
  private static db: sqlite3.Database;

  private constructor() {
    AdminDatabase.db = new sqlite3.Database(dbFilePath);
    this.init();
  }

  public static getInstance(): AdminDatabase {
    if (!AdminDatabase.instance) {
      AdminDatabase.instance = new AdminDatabase();
    }
    return AdminDatabase.instance;
  }

  private init() {
    AdminDatabase.db.serialize(() => {
      AdminDatabase.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='admin'", (err, row) => {
        if (err) {
          console.error("Error checking if table exists:", err);
        } else if (!row) {
          AdminDatabase.db.run(`
            CREATE TABLE admin (
              idx INTEGER PRIMARY KEY,
              text TEXT,
              file_path TEXT
            );
          `, (err) => {
            if (err) {
              console.error("Error creating table:", err);
            } else {
              this.reset().then(() => {
                console.log("Table created and data inserted successfully");
              }).catch((err) => {
                console.error("Error inserting data:", err);
              });
            }
          });
        } else {
          console.log("Table already exists");
        }
      });
    });
  }
  

  reset() {
    return new Promise<void>(async (resolve,reject) => {
      for (let i = 0; i < 20; i++) {
        await this.upsertOne(i, TEXT[i]);
      }
      resolve();
    })    
  }

  selectAll() {
    return new Promise<Colume[]>((resolve, reject) => {
      AdminDatabase.db.all('SELECT * FROM admin', (err, rows:any[]) => {
        if (err) {
          reject(err);
        } else {
          const parsedRows:Colume[] = rows.map(row => {
            return {
              idx: row.idx,
              text: row.text,
              file_path: row.file_path,
            };
          });
          resolve(parsedRows);
        }
      });
    });
  }
  

  selectOne(index: number) {
    return new Promise<Colume>((resolve, reject) => {
      AdminDatabase.db.get(`SELECT * FROM admin WHERE idx=${index}`, (err, row:any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            idx : row.idx,
            text : row.text,
            file_path : row.file_path
          });
        }
      });
    });
  }

  upsertOne(index: number, text: string) {
    return new Promise<boolean>((resolve, reject) => {
      AdminDatabase.db.run(
        `INSERT OR REPLACE INTO admin (idx, text, file_path) VALUES (?,?,?)`,
        [index, text, path.join(__dirname, 'voice', `${index}.mp3`)],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

export default AdminDatabase;
