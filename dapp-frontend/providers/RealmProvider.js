import {createRealmContext} from '@realm/react';
import { User } from '../entities/User';

const config = {
    schema: [User],
};
const RealmContext = createRealmContext(config);

export const { useObject, useQuery, useRealm } = RealmContext;

export default RealmContext.RealmProvider;