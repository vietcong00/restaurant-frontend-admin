export default {
    title: ' Quản lý hóa đơn',
    message: {
        createSuccess: 'Tạo hoá đơn thành công!',
        updateSuccess: 'Cập nhật hoá đơn thành công!',
        deleteBilling: 'Bạn có chắc chắn muốn xóa hóa đơn này không?',
        deleteBillingTitle: 'Xóa hóa đơn',
        deleteSuccess: 'Xóa hóa đơn thành công!',
    },
    tooltip: {
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
    },
    filterForm: {
        createdAt: 'Ngày tạo',
        name: 'Tên',
        keyword: {
            label: 'Từ khóa',
            placeholder: 'Nhập từ khóa',
        },
        payer: {
            label: 'Người thanh toán',
            placeholder: 'Chọn người thanh toán',
        },
        paymentDateRange: {
            label: 'Phạm vi ngày thanh toán',
            to: 'Đến',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
        },
    },
    statusBillingOptions: {
        waitForPay: 'Chờ thanh toán',
        paid: 'Đã thanh toán',
    },
};
