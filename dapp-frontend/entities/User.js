import { Realm } from '@realm/react';
import { TableName } from '../utils/userInfo';

export class User extends Realm.Object {
    _id;
    nickName;
    secureKey;
    pwMD5;

    static generate(description) {
        return {
            _id: new Realm.BSON.ObjectId(),
            nickName: '',
            secureKey: '',
            pwMD5: '',
        };
    }
    
    static schema = {
        name: TableName,
        properties: {
            _id: "int",
            nickName: "string",
            secureKey: "string",
            pwMD5: "string",
        },
        primaryKey: "_id",
    };
}