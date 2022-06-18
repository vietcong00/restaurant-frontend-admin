import { IUser } from '@/modules/user/types';
import { IQueryString } from '@/common/types';

export enum SHIFT {
    MORNING_SHIFT = 'morningShift',
    AFTERNOON_SHIFT = 'afternoonShift',
}

export interface IClosingRevenue {
    id: number;
    shiftWork: SHIFT;
    shiftLeader: IUser;
    cashAtBeginningOfShift: number;
    billingRevenue: number;
    importMoney: number;
    exportMoney: number;
    cashAtEndingOfShift: number;
    bankingRevenue: number;
    differenceRevenue: number;
    note: string;
}

export interface IClosingRevenueCreateBody {
    shiftWork: SHIFT | undefined;
    cashAtBeginningOfShift: number | undefined;
    cashAtEndingOfShift: number | undefined;
    bankingRevenue: number | undefined;
    differenceRevenue: number | undefined;
    note: string | undefined;
}

export interface IClosingRevenueUpdateBody extends IClosingRevenueCreateBody {
    id: number | undefined;
}

export interface IQueryStringClosingRevenue extends IQueryString {
    keyword?: string;
    payerIds?: number[];
    paymentDateRange?: string[] | null;
}
