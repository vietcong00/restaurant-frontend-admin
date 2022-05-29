import { BookingStatus } from './constants';
import { IQueryString } from '@/common/types';

export interface IMaterial {
    id: number;
    material: string;
    unit: string;
    quantity: number;
    updateAt: Date | string;
}

export interface ISupplier {
    id: number;
    name: string;
    phone: string;
    address: string;
    updateAt: Date | string;
}

export interface IGetTables {
    tables: Array<IMaterial>;
    totalProduct: number;
}

export interface IPatchQueryTable {
    status: string;
    nameCustomer?: string;
    phone?: string;
    arrivalTime?: string;
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
    id: number | string;
    name: string;
}

export interface IGetCategories {
    categories: Array<ICategory>;
}

export interface IFood {
    id: number;
    name: string;
    price: string;
    descriptions: string;
    imgLink: string;
    category: ICategory;
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

export interface IQueryStringBooking extends IQueryString {
    keyword?: string | null;
    status?: BookingStatus[] | null;
    arrivalTimeRange?: string[] | null;
}

export type TModalType = 'Create' | 'Edit' | 'Close';

export interface ITextItem {
    name: string;
    number: number;
}

export interface ITable {
    id: number;
    name: string;
    status: string;
    numberSeat: number;
    idRestaurant: number;
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

export interface IInventoryOfficer {
    id: number;
    name: string;
}

export interface ICheckInventory {
    id: number;
    checkTime: string;
    inventoryOfficer: IInventoryOfficer;
    status: string;
    note: string;
}
export interface IInventoryDetail {
    id: number;
    nameMaterial: string;
    inventoryQuantity: number;
    inventoryUnit: string;
    damagedQuantity: number;
    damagedUnit: string;
    note: string;
}

export interface IWarehouseStaff {
    id: number;
    name: string;
}
export interface IImportMaterial {
    id: number;
    importTime: string;
    supplier: string;
    warehouseStaff: IWarehouseStaff;
    note: string;
}
export interface IImportMaterialDetail {
    id: number;
    nameMaterial: string;
    importPrice: number;
    quantity: number;
    unit: string;
    note: string;
}
