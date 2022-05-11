import cloneDeep from 'lodash/cloneDeep';
import { IUser } from '../user/types';
import { ITableOptions } from './types';

export function parseTableMembers(options: IUser[]): ITableOptions[] {
    const tmp = cloneDeep(options);
    const results = cloneDeep(
        tmp.map((option: IUser) => ({
            ticked: false,
            user: option,
            userId: option.id,
            userRole: '',
            order: 0,
            errorOrder: '',
            errorRole: '',
        })),
    );
    return results;
}
