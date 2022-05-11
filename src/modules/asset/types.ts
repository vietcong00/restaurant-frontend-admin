import { IQueryString } from '@/common/types';
import { AssetType, RequestAssetStatus, UsingStatus } from './constants';
import Condition from 'yup/lib/Condition';
import { SupportLanguage } from '@/common/constants';

export interface IAssignee {
    id: number;
    fullName: string;
}

export type IAssetCategory = {
    code: string;
    value: Record<SupportLanguage, string>;
    inUse?: boolean;
};

export interface IAsset {
    id: number;
    name: string;
    type: string;
    usingStatus: string;
    category: string;
    createdBy: string;
    description: string;
    price: number;
    assignee: IAssignee;
    code: string;
    isAutoGenerateCode: boolean;
    requestAssetId?: number | undefined;
    purchaseDate: string;
}

export interface IRequestAsset {
    id: number;
    name: string;
    type: string;
    category: string | null;
    createdBy: string;
    createdAt: string | null;
    createdUser: string;
    requestQuantity: number;
    approveQuantity: number | null;
    description: string;
    price: number;
    status: string;
    assignee: IAssignee;
}

export interface ICreateAsset {
    requestAssetId?: number | undefined;
    name: string | undefined;
    type: string | undefined;
    category: string | undefined;
    usingStatus: string | undefined;
    assigneeId: number | undefined | null;
    description: string | undefined;
    price: number | undefined;
    code: string | undefined | null;
    isAutoGenerateCode: boolean | undefined;
    purchaseDate: string | undefined;
}

export interface IUpdateAsset extends ICreateAsset {
    id?: number | undefined;
}

export interface ICreateRequestAsset {
    name: string | undefined;
    type: string | undefined;
    category: undefined | string;
    requestQuantity: number | undefined;
    description: string | undefined;
    price: string | undefined;
}

export interface IUpdateRequestAsset extends ICreateRequestAsset {
    id: number | undefined;
}
export interface IQueryStringAsset extends IQueryString {
    keyword?: string | null;
    types?: AssetType[] | null;
    usingStatus?: Condition[] | null;
    categories?: string[] | null;
    assigneeIds?: number[] | null;
    purchaseDateRange?: string[] | null;
}

export interface IQueryStringRequestAsset extends IQueryString {
    keyword?: string | null;
    types?: AssetType[] | null;
    categories?: string[] | null;
    status?: RequestAssetStatus[] | null;
}

export interface IRowSpan {
    row: any;
    column: any;
    rowIndex: number;
    columnIndex: number;
}

export interface IImportAsset {
    index?: number;
    assetName: string;
    type: AssetType;
    usingStatus: UsingStatus;
    category: string;
    createdAt: string;
    description: string;
    price: number;
    assigneeEmail: string;
    code: string;
    isAutoGenerateCode: boolean;
    purchaseDate: string;
}

export interface IImportAssets {
    importAssets: IImportAsset[];
}
