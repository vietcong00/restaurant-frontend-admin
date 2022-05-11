import { EventStatus } from './constants';
import { IQueryString } from '@/common/types';

export interface IEvent {
    id: number;
    title: string;
    description?: string | '';
    status: EventStatus;
    imageUrl?: string | null;
    startDate: Date;
    endDate: Date;
    userQuantity?: number | 0;
    budget?: number | 0;
    updatedAt?: Date;
}

export interface IEventCreate {
    title: string | undefined;
    description?: string | undefined;
    status: EventStatus | undefined;
    imageUrl?: string | null | undefined;
    startDate: Date | string | undefined;
    endDate: Date | string | undefined;
    userQuantity?: number | undefined;
    budget?: number | undefined;
}

export interface IQueryStringEvent extends IQueryString {
    keyword?: string | null;
    status?: EventStatus[] | null;
    startDate?: string[] | null;
}

export interface IEventUpdate extends IEventCreate {
    id: number;
}
