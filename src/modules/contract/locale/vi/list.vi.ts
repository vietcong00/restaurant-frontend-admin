export default {
    title: {
        viewByContract: 'Xem theo hợp đồng',
        viewByUser: 'Xem theo nhân viên',
    },
    pageName: 'Trang hợp đồng',
    filterForm: {
        title: 'Quản lý hợp đồng',
        createContract: 'Tạo',
        search: 'Tìm kiếm',
        employee: {
            label: 'Nhân viên',
            placeholder: 'Chọn nhân viên',
        },
        startDate: {
            label: 'Ngày bắt đầu',
            placeholder: 'Chọn ngày bắt đầu',
        },
        endDate: {
            label: 'Ngày kết thúc',
            placeholder: 'Chọn ngày kết thúc',
        },
        type: {
            label: 'Loại hợp đồng',
            placeholder: 'Chọn loại hợp đồng',
        },
        to: 'Đến',
        url: {
            label: 'Đường dẫn tới hợp đồng',
            placeholder: 'Nhập đường dẫn tới hợp đồng',
        },
        status: {
            label: 'Trạng thái',
            placeholder: 'Chọn trạng thái',
            active: 'Hoạt động',
            expired: 'Hết hạn',
            stopped: 'Dừng hoạt động',
            aboutToExpire: 'Sắp hết hạn',
        },
        sort: {
            label: 'Sắp xếp',
            placeholder: 'Chọn trường để sắp xếp',
            createdAt: 'Ngày tạo',
            fullName: 'Tên nhân viên',
            contractType: 'Loại hợp đồng',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
            status: 'Trạng thái',
        },
    },
    contractTable: {
        header: {
            employee: 'Nhân viên',
            contractType: 'Loại hợp đồng',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
            url: 'Đường dẫn tới hợp đồng',
            status: 'Trạng thái',
            actions: 'Hành động',
        },
        action: {
            edit: 'Chỉnh sửa',
            delete: 'Xóa',
        },
        tooltip: {
            edit: 'Chỉnh sửa',
            delete: 'Xóa',
            stop: 'Dừng',
            expired: 'Hết hạn',
            active: 'Đang hoạt động',
            stopped: 'Dừng hoạt động',
        },
    },
    deleteContract: {
        confirmPopup: {
            title: 'Xóa hợp đồng',
            message: 'Bạn có chắc muốn xóa hợp đồng này không?',
        },
        notification: {
            title: 'Thông báo',
            messageSuccess: 'Xóa hợp đồng thành công!',
        },
    },
};
