import {
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
} from '@/common/constants';

export default {
    title: {
        asset: 'Asset management',
        requestAsset: 'Request assets',
        viewByAsset: 'View by asset',
        viewByAssignee: 'View by assignee',
    },
    fieldsValues: {
        status: {
            approved: 'Approved',
            pending: 'Pending',
            rejected: 'Rejected',
            done: 'Done',
            processing: 'Processing',
        },
        assetType: {
            hardware: 'Hardware',
            software: 'Software',
        },
    },
    filterForm: {
        assetCategory: {
            placeholder: "Select asset's categories",
        },
        assetType: {
            software: 'Software',
            hardware: 'Hardware',
            placeholder: "Select asset's types",
        },
        usingStatus: {
            using: 'In use',
            not_using: 'Not in use',
            out_of_service: 'Out of service',
            placeholder: "Select asset's using status",
        },
        status: {
            approved: 'Approved',
            pending: 'Pending',
            rejected: 'Rejected',
            done: 'Done',
            processing: 'Processing',
            placeholder: "Select request asset's status",
        },
        keyword: {
            label: 'Keyword',
            placeholder: 'Enter keyword',
        },
        assignee: {
            placeholder: 'Select assignees',
        },
        button: {
            search: 'Search',
        },
        sort: {
            placeholder: 'Sort',
        },
        purchaseDateRange: {
            label: 'Purchase Date Range',
            to: 'To',
            startDate: 'Start date',
            endDate: 'End date',
        },
    },
    confirmDelete: {
        deleteRequestAssetConfirmText:
            'Are you sure you want to delete this request asset?',
        deleteAssetConfirmText: 'Are you sure you want to delete this asset?',
        deleteRequestAssetConfirmTitle: 'Delete request asset',
        deleteAssetConfirmTitle: 'Delete asset',
        success: {
            title: 'Notification',
            message: 'Delete asset successfully!',
            messageRequest: 'Delete request asset completed!',
        },
        error: {
            title: 'Notification',
            message: 'Delete asset failed!',
        },
    },
    confirmApprove: {
        approveRequestTitle: 'Approve request asset',
        rejectedRequestTitle: 'Reject request asset',
        updateApproveQuantityTitle: 'Approval',
        approveRequestText: 'Are you sure you want to approve this request asset?',
        confirmRejectText: 'Are you sure you want to reject this request asset?',
        approveButtonText: 'Update',
        rejectButtonText: 'Reject',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        message: {
            approvedSuccess: 'Approved request asset successfully!',
            approvingFailed: 'Approving failed!',
            rejectSuccess: 'Reject request asset successfully!',
            rejectFailed: 'Reject request asset failed!',
            positiveInteger: 'Approve request asset must be positive integer',
        },
    },
    fields: {
        name: 'Asset name',
        requestAsset: 'From Request',
        assetType: 'Type',
        assetCategory: 'Category',
        usingStatus: 'Using Status',
        createdAt: 'Created At',
        createdBy: 'Created By',
        purchasedDate: 'Purchased date',
        description: 'Description',
        requestQuantity: 'Request quantity',
        approveQuantity: 'Approve quantity',
        code: 'Code',
        price: 'Price',
        assignee: 'Assignee',
        actions: 'Actions',
        purchaseDate: 'Purchase date',
        status: 'Status',
        isAutoGenerateCode: 'Auto generate',
        errors: {
            price_regex: 'The price field format is invalid',
            maxApproveQuantity:
                'The approve quantity must be smaller than request quantity',
        },
    },
    tooltip: {
        check: 'Check',
        edit: 'Edit',
        add: 'Add',
        delete: 'Delete',
    },
    import: {
        importAsset: 'Import asset',
        category: {
            required: 'The category field is required',
            invalid: 'Category is invalid',
        },
        assetName: {
            required: 'The asset name field is required',
            maxLength: `Asset name length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
        assignee: {
            required: 'The assignee field is required',
            formatError: 'The assignee must be correct format',
            maxLength: `Assignee length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
        purchaseDate: {
            required: 'The purchase date field is required',
            invalid: 'Purchase date is invalid',
            afterNow: 'Purchase date must be less than now',
        },
        type: {
            required: 'The type field is required',
            invalid: 'Type is invalid',
        },
        price: {
            required: 'The price field is required',
            invalid: 'Price is not allow',
            max: `The price field can not be over ${INPUT_NUMBER_MAX_VALUE}`,
        },
        usingStatus: {
            required: 'The using status field is required',
            invalid: 'Using status is invalid',
        },
        code: {
            uniqueError: 'Code must be unique',
            maxLength: `Code length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
        description: {
            maxLength: `Description length must be less than or equal to ${TEXTAREA_MAX_LENGTH} characters`,
        },
    },
};
