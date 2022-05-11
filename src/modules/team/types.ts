import { IQueryString } from '@/common/types';
import { UserRole } from './constants';
import { IUser } from '../user/types';

export interface IMember {
    id: number;
    teamId: number;
    userId: number;
    userRole: UserRole | string;
    order: number;
    user: IUser;
}

export interface ITeam {
    id: number;
    name: string;
    description: string;
    members: IMember[];
    totalMembers: number;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
    createdBy: number | null;
}

export interface ITableOptions {
    userId: number;
    userRole: string;
    order: number;
    user: IUser;
    ticked: boolean;
    errorRole: string | '';
    errorOrder: string | '';
}

export interface ITeamFilterForm {
    name?: string | null;
}

export interface IQueryStringTeam extends IQueryString, ITeamFilterForm {}

export interface IMemberInfo {
    userId: number;
    userRole: string;
    order: number;
}

export interface ITeamCreate {
    name: string;
    description: string;
    usersInfo: IMemberInfo[];
}

export interface ITeamUpdate extends ITeamCreate {
    id: number | undefined;
}
