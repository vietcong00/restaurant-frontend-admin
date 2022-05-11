import { IQueryString } from '@/common/types';
import { IContractUser } from '../contract/types';

export interface IBilling {
    id: number;
    name: string;
    description: string;
    url: string;
    payDate: string;
    user: IContractUser;
    payerId?: number;
}

export interface IBillingCreate {
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
    payerId: string | undefined;
    payDate: string | undefined;
}

export interface IBillingUpdate extends IBillingCreate {
    id: number | undefined;
}

export interface IQueryStringBilling extends IQueryString {
    keyword?: string;
    payerIds?: number[];
    paymentDateRange?: string[] | null;
}
