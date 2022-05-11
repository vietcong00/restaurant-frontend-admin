export default {
    pageName: 'Ứng viên',
    detail: {
        createTitle: 'Thêm mới ứng viên',
        updateTitle: 'Chỉnh sửa ứng viên',
        sendEmail: 'Gửi email',
        email: 'Email',
        phoneNumber: 'Số điện thoại',
        note: 'Ghi chú',
        birthday: 'Ngày sinh',
        address: 'Địa chỉ',
        hometownAddress: 'Quê quán',
        gender: {
            label: 'Giới tính',
            male: 'Nam',
            female: 'Nữ',
            other: 'Khác',
        },
        fullName: 'Họ tên',
        cv: 'Tải CV lên',
        appliedPosition: 'Vị trí',
        level: 'Trình độ',
        resource: 'Nguồn giới thiệu',
        btn: {
            save: 'Xác nhận',
            cancel: 'Hủy',
        },
        dialog: {
            title: 'Thông báo ',
            updateSuccess: 'Cập nhật ứng viên thành công!',
            updateFail: 'Cập nhật ứng viên không thành công!',
        },
        error: {
            common: {
                empty: 'Đây là trường bắt buộc',
            },
            cv: {
                url: 'Hãy nhập đúng url',
                empty: 'Đây là trường bắt buộc',
            },
        },
    },
    info: {
        title: 'Thông tin thêm',
        appliedPosition: 'Vị trí',
        level: 'Trình độ',
        status: 'Trạng thái',
        sendEmail: {
            label: 'Gửi email',
            sent: 'Đã gửi',
            unsent: 'Chưa gửi',
        },
        interview: {
            label: 'Lên lịch',
        },
        referredSource: {
            label: 'Nguồn giới thiệu',
            humanResources: 'Ban nhân sự',
            internalIntroduction: 'Nội bộ',
            headHunter: 'Dịch vụ bên ngoài',
        },
        statusContent: {
            approved: 'Đã duyệt',
            reject: 'Đã từ chối',
            pending: 'Đang đợi duyệt',
            emailSent: 'Đã gửi email',
        },
        linkCV: 'Đường dẫn tới CV',
        createdAt: 'Ngày tạo',
        updatedAt: 'Ngày sửa',
        note: 'Ghi chú',
        at: 'Ngày',
    },
    interviews: {
        title: 'Lịch phỏng vấn',
        table: {
            date: 'Thời gian phỏng vấn',
            order: 'Số lần phỏng vấn',
            result: 'Kết quả',
            note: 'Ghi chú',
            action: 'Hành động',
            progress: 'Tiến độ',
        },
        dialog: {
            title: 'Xóa ứng viên?',
            message: 'Bạn chắc chắn muốn xóa ứng viên này?',
            cancel: 'Hủy',
            delete: 'Xóa',
        },
        dialogUpdate: {
            title: 'Cập nhật lịch phỏng vấn',
            type: 'Kiểu',
            note: {
                label: 'Ghi chú',
                placeholder: 'Nhập ghi chú',
            },
            cancel: 'Hủy',
            update: 'Cập nhật',
            result: 'Kết quả',
            order: 'Số lần phỏng vấn',
            date: {
                label: 'Thời gian phỏng vấn',
                placeholder: 'Chọn thời gian',
            },
            error: {
                invalidDate: 'Ngày giờ phải muộn hơn hiện tại',
            },
        },
        notification: {
            title: {
                create: 'Thông báo',
                update: 'Thông báo',
                delete: 'Xóa lịch phỏng vấn',
            },
            success: 'Tạo lịch phỏng vấn thành công!',
            updateSuccess: 'Cập nhật lịch phỏng vấn thành công!',
            fail: 'Tạo lịch phỏng vấn không thành công!',
            invalidStatus: 'Ứng viên được phê duyệt mới tạo được lịch!',
        },
        order: {
            order1: 'PV lần 1',
            order2: 'PV lần 2',
        },
        progress: {
            waiting: 'Đang chờ',
            done: 'Hoàn thành',
            cancel: 'Hủy',
        },
    },
    create: {
        title: 'Thêm ứng viên',
        pageName: 'Tạo mới ứng viên',
        fields: {
            fullName: {
                label: 'Họ tên',
                placeholder: 'Nhập họ tên',
            },
            email: {
                label: 'Email',
                placeholder: 'Nhập email',
                invalid: 'Email không hợp lệ',
            },
            phoneNumber: {
                label: 'Số điện thoại',
                placeholder: 'Nhập số điện thoại',
                invalid: 'Số điện thoại phải có 10 hoặc 11 chữ số',
            },
            birthday: {
                label: 'Ngày sinh',
                placeholder: 'Chọn ngày sinh',
            },
            cv: {
                label: 'Tải CV',
            },
            gender: {
                label: 'Giới tính',
                placeholder: 'Chọn giới tính',
            },
            appliedPosition: {
                label: 'Vị trí ứng tuyển',
                placeholder: 'Nhập vị trí ứng tuyển',
            },
            level: {
                label: 'Trình độ',
                placeholder: 'Chọn trình độ',
            },
            resource: {
                label: 'Nguồn giới thiệu',
                placeholder: 'Chọn nguồn giới thiệu',
            },
            note: {
                label: 'Ghi chú',
                placeholder: 'Nhập ghi chú',
            },
        },
        button: {
            reset: 'Đặt lại',
            submit: 'Xác nhận',
        },
        notification: {
            title: 'Thông báo',
            messageSuccess: 'Tạo mới ứng viên thành công!',
        },
        errorMessage: 'Lỗi hệ thống',
    },
    title: 'Thông tin ứng viên',
    candidateEmail: {
        title: 'Các email đã gửi',
        button: {
            edit: 'Chỉnh sửa',
            delete: 'Xóa',
        },
        dialog: {
            title: 'Xóa lịch sử email ?',
            message: 'Bạn chắc chắn muốn xóa lịch sử email?',
            cancel: 'Hủy',
            delete: 'Xóa',
        },
        table: {
            date: 'Thời gian gửi',
            status: 'Trạng thái',
            type: 'Loại',
            note: 'Ghi chú',
            action: 'Hành động',
            template: 'Mẫu gửi',
        },
        dialogUpdate: {
            type: 'Loại',
            title: 'Cập nhật email',
            placeholder: 'Vui lòng chọn kiểu',
            note: 'Ghi chú',
            cancel: 'Hủy',
            update: 'Cập nhật',
        },
        notification: {
            sendOk: 'Đã gửi email!',
            sendFail: 'Không thể gửi email!',
            updateSuccessfull: 'Cập nhật email thành công',
        },
        type: {
            interview: 'Phỏng vấn',
            salaryOffer: 'Thỏa thuận lương',
        },
    },
    sendEmailDialog: {
        upload: 'Nhấn để chọn tệp',
        title: 'Gửi email',
        template: 'Mẫu email',
        subject: 'Tiêu đề',
        sendFrom: 'Người gửi',
        sendTo: 'Người nhận',
        name: 'Tên',
        city: 'Thành phố',
        placeholder: 'Vui lòng chọn một mẫu email',
        cancel: 'Hủy',
        send: 'Gửi',
        type: 'Loại email',
        note: 'Ghi chú',
        error: {
            minExpiredReplyDate: 'Hạn phản hồi phải lớn hơn hiện tại',
            minInterviewAtWithExpiredReplyDate:
                'Thời gian phỏng vấn phải lớn hơn hạn phản hồi',
            minInterviewAtWithoutExpiredReplyDate:
                'Thời gian phỏng vấn phải lớn hơn hiện tại',
            minStartWorkingDateWithExpiredReplyDate:
                'Ngày bắt đầu làm việc phải lớn hơn hạn phản hồi',
            minStartWorkingDateWithoutExpiredReplyDate:
                'Ngày bắt đầu làm việc phải lớn hơn hiện tại',
        },
        attributes: {
            common: {
                fullName: 'Họ và tên',
                subject: 'Tiêu đề',
                appliedPosition: 'Vị trí',
            },
            fullName: {
                label: 'Họ và tên',
                placeholder: 'Nhập học và tên',
            },
            subject: {
                label: 'Tiêu đề',
                placeholder: 'Nhập tiêu đề',
            },
            appliedPosition: {
                label: 'Vị trí ứng tuyển',
                placeholder: 'Nhập vị trí',
            },
            attachment: {
                label: 'Tệp đính kèm',
            },
            expiredReplyDate: {
                label: 'Hạn phản hồi',
                placeholder: 'Chọn hạn phản hồi',
            },
            startWorkingDate: {
                label: 'Ngày bắt đầu làm việc',
                placeholder: 'Chọn ngày bắt đầu làm việc',
            },
            interviewAt: {
                label: 'Thời gian phỏng vấn',
                placeholder: 'Chọn thời gian phỏng vấn',
            },
            gender: {
                male: 'anh',
                female: 'chị',
            },
        },
    },
    history: {
        title: 'Lịch sử phỏng vấn',
        table: {
            date: 'Thời gian',
            status: 'Trạng thái',
            note: 'Ghi chú',
        },
        status: {
            cv_reviewing: 'Sàng lọc CV',
            cv_approved: 'Phê duyệt CV',
            waiting_reply_first_interview: 'Chờ PV lần 1',
            first_interview: 'Phỏng vấn lần 1',
            waiting_reply_second_interview: 'Chờ PV lần 2',
            second_interview: 'Phỏng vấn lần 2',
            elected: 'Trúng tuyển',
            waiting_reply_offer: 'Chờ ứng viên phản hồi',
            candidate_agree: 'Ứng viên chấp nhận',
            onboard: 'Onboard',
            not_onboard: 'Not Onboard',
            candidate_reject: 'Ứng viên từ chối',
            cv_rejected: 'Từ chối CV',
            interview_fail: 'Phỏng vấn không thành công',
            candidate_cancel: 'Ứng viên hủy lịch',
        },
    },
    footer: {
        approve: 'Phê duyệt',
        reject: 'Từ chối',
        notification: {
            message: {
                cvStatus: {
                    updated: 'Trạng thái CV đã được cập nhật',
                },
                approveSuccess: 'Đã duyệt!',
                approveFail: 'Duyệt không thành công!',
                rejectSuccess: 'Đã từ chối!',
                rejectFail: 'Từ chối không thành công!',
            },
            title: {
                approve: 'Duyệt ứng viên',
                reject: 'Từ chối ứng viên',
            },
        },
    },
};
