import { IQueryString } from '@/common/types';
import { IRequestAbsence } from '../request-absence/types';
import { UserStatus } from '../user/constants';
export interface ITimekeepingQueryString extends IQueryString {
    userId?: number | null;
    keyword?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    userIds?: number[];
    statuses?: UserStatus[];
    excludedUserIds?: number[];
}

export interface ITimekeeping {
    id: number | null;
    checkIn: string | null;
    checkOut: string | null;
    date: string;
    requestAbsences: IRequestAbsence[];
    hasEnoughPaidLeaveHours?: boolean;
}

export interface IUserTimeKeeping {
    id?: number;
    fullName?: string;
    paidLeaveHourThisMonth: number;
    timekeepings: Record<string, ITimekeeping>;
    avatarName?: string;
    avatarUrl?: string;
    avatarId?: number;
}

export interface ITimeKeepingFilter {
    keyword?: string | null;
    selectedWeek: string;
    selectedMonth: string;
}

export interface ICellColumn {
    row: {
        timekeepings: ITimekeeping;
    };
    column: {
        property: string;
        rawColumnKey: never;
    };
}

export interface IRowTable {
    id: number;
    timekeepings: ITimekeeping[];
}
export interface IColumnTable {
    property: string;
    rawColumnKey: never;
}

export interface ITimeKeepingCreate {
    userId: number | undefined;
    dateTime: string | Date;
    startTime: string | Date | null;
    endTime: string | Date | null;
}

export interface ITimeKeepingForm {
    id?: null | number;
    userId?: null | string | number;
    timekeeping?: ITimekeeping | null;
    dateTime?: string | Date | null;
}

export interface IGetTimeKeeping {
    id: number;
    userId: number;
    fingerId: string;
    checkIn: string;
    checkOut: string;
    dateScan: string;
}
export interface IExportTimekeeping {
    startDate: string;
    endDate: string;
    userIds?: number[];
}
