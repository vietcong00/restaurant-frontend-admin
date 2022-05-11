export default {
    eventTable: {
        header: {
            id: 'ID',
            title: 'Tên sự kiện',
            desc: 'Mô tả',
            status: 'Trạng thái',
            startDate: 'Thời gian bắt đầu',
            endDate: 'Thời gian kết thúc',
            quantity: 'Người tham gia',
            budget: 'Ngân sách',
            actions: 'Hành động',
            linkImage: 'Đường dẫn đến ảnh',
            description: 'Mô tả',
        },
        content: {
            linkImage: 'Nhấn để xem',
        },
    },

    filterForm: {
        keyword: 'Từ khóa',
        onMonth: 'Tháng',
        status: 'Trạng thái',
        userQuantityRange: 'Lượng người tham dự',
        budget: 'Ngân sách',
        sort: {
            createdAt: 'Ngày tạo',
            title: 'Tên',
            startDate: 'Ngày bắt đầu',
            status: 'Trạng thái',
            quantity: 'Số lượng người tham gia',
        },
        startDate: 'Ngày bắt đầu',
        endDate: 'Ngày kết thúc',
        to: 'Đến',
        startDateRange: 'Khoảng ngày bắt đầu',
    },

    status: {
        all: 'Tất cả',
        incoming: 'Sắp diễn ra',
        inprogress: 'Đang diễn ra',
        expired: 'Kết thúc',
    },

    placeholder: {
        keyword: 'Nhập từ khóa',
        title: 'Nhập vào tên sự kiện',
        desc: 'Nhập vào mô tả sự kiện',
        img: 'Nhập vào đường dẫn đến file ảnh',
        status: 'Chọn trạng thái của sự kiện',
        startDate: 'Ngày bắt đầu',
        endDate: 'Ngày kết thúc',
        quantity: 'Số lượng người tham dự',
        budget: 'Ngân sách dự tính',
    },

    tooltip: {
        editStatus: 'Thay đổi trạng thái',
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
    },

    message: {
        title: 'Thông báo',
        create: {
            success: 'Tạo sự kiện thành công!',
        },

        update: {
            success: 'Cập nhật sự kiện thành công!',
        },

        delete: {
            title: 'Xóa sự kiện',
            confirmAsk: 'Bạn có chắc chắn muốn xóa sự kiện này không?',
            success: 'Xóa sự kiện thành công!',
        },
    },

    pageName: ' Quản lý sự kiện',
};
