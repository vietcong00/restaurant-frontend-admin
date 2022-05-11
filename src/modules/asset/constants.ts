import yup from '@/plugins/yup/index';
import {
    TEXTAREA_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    INPUT_NUMBER_MAX_VALUE,
    REGEX,
} from '@/common/constants';

export enum AssetType {
    SOFT_WARE = 'software',
    HARD_WARE = 'hardware',
}

export enum UsingStatus {
    USING = 'using',
    NOT_USING = 'not_using',
    OUT_OF_SERVICE = 'out_of_service',
}

export const NUMBER_REGEX = /^[0-9]\d*$/;
export const MAX_REQUEST_ASSET_QUANTITY = 10000;

export const AssetTypeOptions = [
    {
        label: 'asset.list.filterForm.assetType.software',
        value: AssetType.SOFT_WARE,
    },
    {
        label: 'asset.list.filterForm.assetType.hardware',
        value: AssetType.HARD_WARE,
    },
];

export const UsingStatusOptions = [
    {
        label: 'asset.list.filterForm.usingStatus.using',
        value: UsingStatus.USING,
    },
    {
        label: 'asset.list.filterForm.usingStatus.not_using',
        value: UsingStatus.NOT_USING,
    },
    {
        label: 'asset.list.filterForm.usingStatus.out_of_service',
        value: UsingStatus.OUT_OF_SERVICE,
    },
];

export enum RequestAssetStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    DONE = 'done',
}

export const StatusArray = ['rejected', 'pending', 'approved'];

export const StatusOptions = [
    {
        label: 'asset.list.filterForm.status.pending',
        value: RequestAssetStatus.PENDING,
    },
    {
        label: 'asset.list.filterForm.status.approved',
        value: RequestAssetStatus.APPROVED,
    },
    {
        label: 'asset.list.filterForm.status.rejected',
        value: RequestAssetStatus.REJECTED,
    },
    {
        label: 'asset.list.filterForm.status.done',
        value: RequestAssetStatus.DONE,
    },
];

export enum OrderDirectionText {
    ASC = 'Z - A',
    DESC = 'A - Z',
}

export const DEFAULT_ORDER_BY = 'createdAt';

export const DEFAULT_ASSIGNEE_ORDER_BY = 'assignee';

export const RequestAssetSortOptions = [
    {
        label: 'asset.list.fields.name',
        value: 'name',
    },
    {
        label: 'asset.list.fields.status',
        value: 'status',
    },
    {
        label: 'asset.list.fields.createdAt',
        value: 'createdAt',
    },
    {
        label: 'asset.list.fields.price',
        value: 'price',
    },
];

export const AssetSortOptions = [
    {
        label: 'asset.list.fields.name',
        value: 'name',
    },
    {
        label: 'asset.list.fields.price',
        value: 'price',
    },
    {
        label: 'asset.list.fields.createdAt',
        value: 'createdAt',
    },
    {
        label: 'asset.list.fields.assignee',
        value: 'assignee',
    },
];

export const CreateAssetSchema = yup.object({
    name: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('assetName'),
    description: yup.string().optional().trim().nullable().max(TEXTAREA_MAX_LENGTH),
    usingStatus: yup.string().required().oneOf(Object.values(UsingStatus)),
    type: yup.string().required().oneOf(Object.values(AssetType)).label('assetType'),
    category: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .trim()
        .label('assetCategory'),
    assigneeId: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('assignee'),
    code: yup.string().when('isAutoGenerateCode', {
        is: false,
        then: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    }),
    price: yup
        .number()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .integer()
        .positive()
        .required()
        .max(INPUT_NUMBER_MAX_VALUE),
    isAutoGenerateCode: yup.boolean().default(true),
    requestAssetId: yup.number().positive().max(INPUT_NUMBER_MAX_VALUE),
    purchaseDate: yup.string().matches(REGEX.YYYY_MM_DD_HYPHEN).nullable().required(),
});

export const CreateRequestAssetSchema = yup.object({
    name: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('assetName'),
    description: yup.string().trim().optional().nullable().max(TEXTAREA_MAX_LENGTH),
    type: yup
        .string()
        .trim()
        .required()
        .oneOf(Object.values(AssetType))
        .label('assetType'),
    category: yup
        .string()
        .max(INPUT_NUMBER_MAX_VALUE)
        .trim()
        .required()
        .label('assetCategory'),
    requestQuantity: yup
        .number()
        .positive()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .max(MAX_REQUEST_ASSET_QUANTITY)
        .required(),
    price: yup
        .number()
        .integer()
        .positive()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .required()
        .max(INPUT_NUMBER_MAX_VALUE),
});

export enum ASSET_TABS {
    VIEW_BY_ASSET = 'VIEW_BY_ASSET',
    VIEW_BY_ASSIGNEE = 'VIEW_BY_ASSIGNEE',
}

export const DEFAULT_CURRENT_TAB = ASSET_TABS.VIEW_BY_ASSET;

export const approveQuantitySchema = yup.object({
    requestQuantity: yup.number().max(INPUT_NUMBER_MAX_VALUE).required(),
    approveQuantity: yup
        .number()
        .required()
        .positive()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .max(yup.ref('requestQuantity'), 'asset.list.fields.errors.maxApproveQuantity'),
});
