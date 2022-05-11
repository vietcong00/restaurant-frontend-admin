export default {
    pageName: ' Quản lý nhóm',
    menuAction: {
        removeTeam: 'Xóa nhóm',
        editTeam: 'Chỉnh sửa',
        addMember: 'Thêm thành viên',
        reset: 'Đặt lại',
    },
    filterForm: {
        title: 'Quản lý nhóm',
        emptyMessage: 'Không có dữ liệu',
        employees: ' Thành viên',
        createTeam: 'Tạo',
        sort: {
            title: 'Sort by',
            label: 'Sắp xếp',
            placeholder: 'Chọn trường để sắp xếp',
            name: 'Tên',
            createdAt: 'Ngày tạo',
        },
        position: {
            label: 'Vị trí',
            placeholder: 'Chọn vị trí',
            developer: 'Lập trình viên',
            infra: 'Infra',
            pm: 'Quản lý dự án',
            tester: 'Kiểm thử viên',
            accounting: 'Kế toán',
        },
    },
    placeholder: {
        name: 'Nhập tên',
        description: 'Nhập mô tả',
        user: 'Chọn thành viên',
        userRole: 'Nhập vào',
        order: 'Chọn thứ tự',
    },

    message: {
        title: 'Thông báo',
        create: {
            success: 'Tạo nhóm thành công!',
            fail: {
                title: 'Tạo nhóm không thành công!',
                mess: 'Vui lòng nhập tất cả các trường bắt buộc!',
            },
        },

        update: {
            success: 'Cập nhật nhóm thành công!',
            updateSuccess: 'Thành công',
            fail: 'Cập nhật nhóm không thành công!',
            cancel: 'Hủy',
            title: 'Cập nhật nhóm',
            confirmAsk: 'Bạn có muốn cập nhật thông tin của nhóm này?',
        },

        delete: {
            title: 'Thông báo',
            deleteSuccess: 'Thành công',
            confirmAsk: 'Bạn có chắc muốn xóa nhóm này không?',
            success: 'Xóa nhóm thành công!',
            fail: 'Xóa nhóm không thành công!',
            cancel: 'Hủy',
        },

        pagination: {
            size: 'Số bản ghi phải lớn hơn 0',
        },
    },
};
