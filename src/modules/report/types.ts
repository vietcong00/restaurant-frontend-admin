import { IQueryString } from '@/common/types';

export enum SHIFT {
    MORNING_SHIFT = 'morningShift',
    AFTERNOON_SHIFT = 'afternoonShift',
}

export interface ICashier {
    id: number;
    name: string;
}

export interface IClosingRevenue {
    id: number;
    date: string;
    shiftWork: SHIFT;
    cashier?: ICashier;
    cashAtBeginningOfShift: number;
    billingRevenue: number;
    importMoney: number;
    cashAtEndOfShift: number;
    bankingRevenue: number;
    differenceRevenue: number;
    note: string;
}

export interface IClosingRevenueCreate {
    date: string | undefined;
    shiftWork: SHIFT | undefined;
    cashier?: ICashier | undefined;
    cashAtBeginningOfShift: number | undefined;
    billingRevenue: number | undefined;
    importMoney: number | undefined;
    cashAtEndOfShift: number | undefined;
    bankingRevenue: number | undefined;
    differenceRevenue: number | undefined;
    note: string | undefined;
}

export interface IClosingRevenueUpdate extends IClosingRevenueCreate {
    id: number | undefined;
}

export interface IQueryStringClosingRevenue extends IQueryString {
    keyword?: string;
    payerIds?: number[];
    paymentDateRange?: string[] | null;
}
