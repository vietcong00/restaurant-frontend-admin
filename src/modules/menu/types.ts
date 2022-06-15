import { IQueryString } from '@/common/types';

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
    price: number;
    imgLink?: string;
    category?: ICategory;
}

export interface IFoodCreate {
    name: string | undefined;
    price: number | undefined;
    imgLink?: string | undefined;
    category?: ICategory | undefined;
}

export interface IFoodUpdate extends IFoodCreate {
    id: number | undefined;
}

export interface IQueryStringFood extends IQueryString {
    keyword?: string | null;
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
