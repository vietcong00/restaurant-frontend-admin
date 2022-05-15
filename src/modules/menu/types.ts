import { IQueryString } from '@/common/types';

export interface ITable {
    id: number;
    name: string;
    status: string;
    numberSeat: number;
    idRestaurant: number;
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
    numberPeople: number;
}

export interface IBookingCreate {
    nameCustomer: string | undefined;
    phone: string | undefined;
    arrivalTime: Date | string | undefined;
    numberPeople: number | undefined;
}

export interface IBookingUpdate extends IBookingCreate {
    id: number | undefined;
}

export interface IPatchBooking {
    status?: string;
    idTable?: number;
}

export interface ICategory {
    id: number;
    name: string;
    priority: string;
    note: string;
}

export interface ICategoryCreate {
    name: string | undefined;
    priority: string | undefined;
    note: string | undefined;
}

export interface ICategoryUpdate extends ICategoryCreate {
    id: number | undefined;
}

export interface IFood {
    id: number;
    name: string;
    price: string;
    mainMaterial: string;
    amount: number;
    imgLink: string;
    category: ICategory;
}

export interface IFoodCreate {
    name: string | undefined;
    price: string | undefined;
    mainMaterial: string | undefined;
    amount: number | undefined;
    imgLink: string | undefined;
    category: ICategory | undefined;
}

export interface IFoodUpdate extends IFoodCreate {
    id: number | undefined;
}

export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface IQueryStringFood extends IQueryString {
    keyword?: string | null;
    mainMaterial?: string | null;
    categories?: number[] | null;
}

export interface IQueryStringCategory extends IQueryString {
    keyword?: string | null;
}

export type TModalType = 'Create' | 'Edit' | 'Close';

export interface ITextItem {
    name: string;
    number: number;
}
