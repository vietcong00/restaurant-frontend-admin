import { IQueryString } from '@/common/types';

export type TModalType = 'Create' | 'Edit' | 'Close';
export interface IWarehouseStaff {
    id: number;
    name: string;
}
// Material
export interface IMaterial {
    id: number;
    material: string;
    unit: string;
    quantity: number;
    updateAt: Date | string;
}

export interface IMaterialCreate {
    material: string | undefined;
    unit: string | undefined;
    quantity: number | undefined;
    updateAt: Date | string | undefined;
}

export interface IMaterialUpdate extends IMaterialCreate {
    id: number | undefined;
}

export interface IQueryStringMaterial extends IQueryString {
    keyword?: string;
}

// Supplier
export interface ISupplier {
    id: number;
    name: string;
    phone: string;
    address: string;
    updateAt: Date | string;
}

export interface ISupplierCreate {
    name: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    updateAt: Date | string | undefined;
}

export interface ISupplierUpdate extends ISupplierCreate {
    id: number | undefined;
}

export interface IQueryStringSupplier extends IQueryString {
    keyword?: string;
}

// Inventory

export interface ICheckInventory {
    id: number;
    checkTime: string;
    warehouseStaff: IWarehouseStaff;
    status: string;
    note: string;
}

export interface ICheckInventoryUpdate {
    id: number | undefined;
    status: string | undefined;
}

export interface IQueryStringCheckInventory extends IQueryString {
    keyword?: string;
}

// Inventory Detail
export interface IInventoryDetail {
    id: number;
    nameMaterial: string;
    inventoryQuantity: number;
    inventoryUnit: string;
    damagedQuantity: number;
    damagedUnit: string;
    note: string;
}

export interface IQueryStringInventoryDetail extends IQueryString {
    keyword?: string;
    idCheckInventory?: number;
}
// import material
export interface IImportMaterial {
    id: number;
    importTime: string;
    supplier: string;
    warehouseStaff: IWarehouseStaff;
    note: string;
}

export interface IQueryStringImportMaterial extends IQueryString {
    keyword?: string;
}
export interface IImportMaterialDetail {
    id: number;
    nameMaterial: string;
    importPrice: number;
    quantity: number;
    unit: string;
    note: string;
}

export interface IQueryStringImportMaterialDetail extends IQueryString {
    keyword?: string;
    idImportMaterial?: number;
}
export interface IExportMaterial {
    id: number;
    importTime: string;
    transporters: string;
    warehouseStaff: IWarehouseStaff;
    note: string;
}

export interface IQueryStringExportMaterial extends IQueryString {
    keyword?: string;
}
export interface IExportMaterialDetail {
    id: number;
    nameMaterial: string;
    exportPrice: number;
    quantity: number;
    unit: string;
    note: string;
}

export interface IQueryStringExportMaterialDetail extends IQueryString {
    keyword?: string;
    idExportMaterial?: number;
}

export interface IPerformer {
    id: number;
    name: string;
}
export interface IConvertHistory {
    id: number;
    convertTime: string;
    convertFrom: string;
    quantityFrom: number;
    quantityBeforeConvertFrom: number;
    quantityBeforeConvertTo: number;
    convertTo: string;
    quantityTo: number;
    performer: IPerformer;
    note: string;
}

export interface IQueryStringConvertHistory extends IQueryString {
    keyword?: string;
}
