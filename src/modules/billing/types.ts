import { IQueryString } from '@/common/types';
import { IFood } from '../menu/types';

export enum STATUS_BILLING {
    WAIT_FOR_PAY = 'waitForPay',
    PAID = 'paid',
}

export enum PAYMENT_METHOD {
    READY_CASH = 'READY_CASH',
    BANKING = 'BANKING',
    SWIPE_CARD = 'SWIPE_CARD',
}
export interface ICashier {
    id: number;
    name: string;
}
export interface IFoodBilling {
    id: number;
    food: IFood;
    quantity: number;
    total: number;
}
export interface IBilling {
    id: number;
    nameCustomer: string;
    phone: string;
    totalBillingPrice: number;
    payDate?: string;
    statusBilling: STATUS_BILLING;
    paymentMethod?: PAYMENT_METHOD;
    cashier?: ICashier;
}

export interface IBillingCreate {
    nameCustomer: string | undefined;
    phone: string | undefined;
    totalBillingPrice: number | undefined;
    payDate: string | undefined;
    statusBilling: STATUS_BILLING | undefined;
}

export interface IBillingUpdate extends IBillingCreate {
    id: number | undefined;
}

export interface IQueryStringBilling extends IQueryString {
    keyword?: string;
    payerIds?: number[];
    paymentDateRange?: string[] | null;
}
