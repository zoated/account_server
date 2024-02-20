
import { Room } from 'src/model/room';
import { User } from '../model/user';
import { createConnection } from 'typeorm'
import { RoomUser } from 'src/model/room_user';
import { Score } from 'src/model/score';

export const initDb = (cb: any) => createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Asd110120.",
    database: "account",
    entities: [User, Room, RoomUser, Score],
  })
    .then((connection) => {
      // 这里可以写实体操作相关的代码
      cb()
    })
    .catch((error) => console.log(error));
