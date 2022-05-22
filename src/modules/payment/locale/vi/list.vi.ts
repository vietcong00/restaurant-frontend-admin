import {
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
} from '@/common/constants';

export default {
    title: {
        asset: 'Quản lý tài sản',
        requestAsset: 'Yêu cầu tài sản',
        viewByAsset: 'Xem theo tài sản',
        viewByAssignee: 'Xem theo người phụ trách',
    },
    pagination: {
        totalItems: 'Tổng: {totalItems} tài sản',
    },
    fieldsValues: {
        status: {
            approved: 'Được duyệt',
            pending: 'Chờ duyệt',
            rejected: 'Từ chối',
            done: 'Đã xong',
            processing: 'Đang xử lý',
        },
        assetType: {
            hardware: 'Phần cứng',
            software: 'Phần mềm',
        },
    },
    filterForm: {
        assetCategory: {
            placeholder: 'Chọn loại thiết bị',
        },
        assetType: {
            software: 'Phần mềm',
            hardware: 'Phần cứng',
            placeholder: 'Chọn loại tài sản',
        },
        usingStatus: {
            using: 'Đang sử dụng',
            not_using: 'Không sử dụng',
            out_of_service: 'Đã hỏng',
            placeholder: 'Chọn tình trạng tài sản',
        },
        status: {
            approved: 'Được duyệt',
            pending: 'Chờ duyệt',
            rejected: 'Từ chối',
            done: 'Đã xong',
            processing: 'Đang xử lý',
            placeholder: 'Chọn trạng thái',
        },
        keyword: {
            label: 'Từ khóa',
            placeholder: 'Nhập từ khóa',
        },
        assignee: {
            placeholder: 'Chọn người phụ trách',
        },
        button: {
            search: 'Tìm kiếm',
        },
        sort: {
            placeholder: 'Sắp xếp',
        },
        purchaseDateRange: {
            label: 'Phạm vi ngày mua',
            to: 'Đến',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
        },
    },
    confirmDelete: {
        deleteRequestAssetConfirmText:
            'Bạn có chắc chắn muốn xóa yêu cầu tài sản này không?',
        deleteAssetConfirmText: 'Bạn có chắc chắn muốn xóa tài sản này không?',
        deleteRequestAssetConfirmTitle: 'Xóa yêu cầu tài sản',
        deleteAssetConfirmTitle: 'Xóa tài sản',
        success: {
            title: 'Thông báo',
            message: 'Xóa tài sản thành công!',
            messageRequest: 'Xóa yêu cầu tài sản thành công!',
        },
        error: {
            title: 'Thông báo',
            message: 'Xóa tài sản không thành công!',
        },
    },
    confirmApprove: {
        approveRequestTitle: 'Xác nhận tài sản',
        rejectedRequestTitle: 'Từ chối tài sản',
        updateApproveQuantityTitle: 'Phê duyệt',
        approveRequestText: 'Bạn chắc chắn muốn xác nhận yêu cầu này?',
        confirmRejectText: 'Bạn chắc chắn muốn từ chối yêu cầu này?',
        approveButtonText: 'Xác nhận',
        rejectButtonText: 'Trở lại',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Trở lại',
        message: {
            approvedSuccess: 'Chấp thuận yêu cầu thành công!',
            approvingFailed: 'Chấp thuận yêu cầu không thành công!',
            rejectSuccess: 'Từ chối yêu cầu tài sản thành công!',
            rejectFailed: 'Từ chối yêu cầu tài sản không thành công!',
            positiveInteger: 'Số lượng chấp thuận phải là số dương',
        },
    },
    fields: {
        name: 'Tên tài sản',
        requestAsset: 'Yêu cầu từ',
        assetType: 'Loại tài sản',
        assetCategory: 'Loại thiết bị',
        usingStatus: 'Tình trạng',
        createdAt: 'Ngày tạo',
        createdBy: 'Người tạo',
        purchasedDate: 'Ngày mua',
        description: 'Mô tả',
        requestQuantity: 'Số lượng yêu cầu',
        approveQuantity: 'Số lượng chấp thuận',
        code: 'Mã tài sản',
        price: 'Giá',
        assignee: 'Người phụ trách',
        actions: 'Hành động',
        purchaseDate: 'Ngày mua',
        status: 'Trạng thái',
        isAutoGenerateCode: 'Tự động tạo',
        errors: {
            price_regex: 'Nhập vào số lớn hơn 0',
            maxApproveQuantity: 'Số lượng chấp nhận phải nhỏ hơn số lượng yêu cầu',
        },
    },
    tooltip: {
        check: 'Kiểm tra',
        edit: 'Chỉnh sửa',
        add: 'Thêm mới',
        delete: 'Xoá',
    },
    import: {
        importAsset: 'Tải tệp tài sản lên',
        category: {
            required: 'Loại thiết bị là trường bắt buộc',
            invalid: 'Loại thiết bị không hợp lệ',
        },
        assetName: {
            required: 'Tên tài sản là trường bắt buộc',
            maxLength: `Tên tài sản phải có ít hơn hoặc bằng ${INPUT_TEXT_MAX_LENGTH} kí tự`,
        },
        assignee: {
            required: 'Người phụ trách là trường bắt buộc',
            formatError: 'Định dạng trường người phụ trách không hợp lệ',
            maxLength: `Người phụ trách phải có ít hơn hoặc bằng ${INPUT_TEXT_MAX_LENGTH} kí tự`,
        },
        purchaseDate: {
            required: 'Ngày mua là trường bắt buộc',
            invalid: 'Ngày mua không hợp lệ',
            afterNow: 'Ngày mua phải nhỏ hơn hiện tại',
        },
        type: {
            required: 'Loại tài sản là trường bắt buộc',
            invalid: 'Loại tài sản không hợp lệ',
        },
        price: {
            required: 'Giá là trường bắt buộc',
            invalid: 'Giá không hợp lệ',
            max: `Giá không được vượt quá ${INPUT_NUMBER_MAX_VALUE}`,
        },
        usingStatus: {
            required: 'Tình trạng sử dụng là trường bắt buộc',
            invalid: 'Tình trạng sử dụng không hợp lệ',
        },
        code: {
            uniqueError: 'Mã tài sản phải là duy nhất',
            maxLength: `Mã tài sản phải có ít hơn hoặc bằng ${INPUT_TEXT_MAX_LENGTH} kí tự`,
        },
        description: {
            maxLength: `Mô tả phải có ít hơn hoặc bằng ${TEXTAREA_MAX_LENGTH} kí tự`,
        },
    },
};
