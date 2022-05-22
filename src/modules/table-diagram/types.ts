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

export interface ITable {
    id: number;
    name: string;
    status: string;
    numberSeat: number;
    idRestaurant: number;
}

export interface IGetTables {
    tables: Array<ITable>;
    totalProduct: number;
}

export interface IPatchQueryTable {
    status: string;
    nameCustomer?: string;
    phone?: string;
    arrivalTime?: string;
}

export interface IBooking {
    id: number;
    nameCustomer: string;
    phone: string;
    arrivalTime: Date;
    status: string;
    table: ITable;
    idRestaurant: number;
    numberPeople: number;
}

export interface IGetBookings {
    bookings: Array<IBooking>;
    totalProduct: number;
}

export interface IPatchBooking {
    status?: string;
    idTable?: number;
}

export interface ICategory {
    id: number | string;
    name: string;
}

export interface IGetCategories {
    categories: Array<ICategory>;
}

export interface IFood {
    id: number;
    name: string;
    price: number;
    descriptions?: string;
    imgLink?: string;
    category?: ICategory;
}

export interface IGetFoods {
    foods: Array<IFood>;
    totalProduct: number;
}

export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface IGetRestaurant {
    tables: Array<IRestaurant>;
    totalProduct: number;
}

export interface IQueryStringTable extends IQueryString {
    keyword?: string | null;
}
