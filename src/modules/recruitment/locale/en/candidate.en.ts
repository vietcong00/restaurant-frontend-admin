export default {
    pageName: 'Candidate detail',
    detail: {
        createTitle: 'Create new candidate',
        updateTitle: 'Update candidate',
        sendEmail: 'Send email',
        email: 'Email',
        phoneNumber: 'Phone number',
        note: 'Note',
        birthday: 'Birthday',
        address: 'Address',
        hometownAddress: 'Hometown address',
        gender: {
            label: 'Gender',
            male: 'Male',
            female: 'Female',
            other: 'other',
        },
        fullName: 'Full name',
        cv: 'Upload CV',
        appliedPosition: 'Applied position',
        level: 'Level',
        resource: 'Referred resource',
        btn: {
            save: 'Save',
            cancel: 'Cancel',
        },
        dialog: {
            title: 'Notification',
            updateSuccess: 'Update candidate successfully!',
            updateFail: 'Update candidate fail!',
        },
        error: {
            common: {
                empty: 'This field is required',
            },
            cv: {
                url: 'Url miss match',
                empty: 'This is a requied field',
            },
        },
    },
    info: {
        title: 'More information',
        position: 'Position',
        level: 'Level',
        status: 'Status',
        sendEmail: {
            label: 'Send Email',
            sent: 'Sent',
            unsent: 'Unsent',
        },
        interview: {
            label: 'Add schedule',
        },
        referredSource: {
            label: 'Referred source',
            humanResources: 'Human resources',
            internalIntroduction: 'Internal introduction',
            headHunter: 'Headhunter',
        },
        statusContent: {
            approved: 'Approved',
            reject: 'Rejected',
            pending: 'Pending',
            emailSent: 'Email has been delivered',
        },
        linkCV: 'Link CV',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        note: 'Note',
        at: 'At',
    },
    interviews: {
        title: 'Interview schedules',
        table: {
            date: 'Interview time',
            order: 'Number of interviews',
            result: 'Result',
            note: 'Note',
            action: 'Action',
            progress: 'Progress',
        },
        dialog: {
            title: 'Delete an interview ?',
            message: 'Are you sure about that?',
            cancel: 'Cancel',
            delete: 'Delete',
        },
        dialogUpdate: {
            title: 'Update interview schedule',
            type: 'Type',
            note: {
                label: 'Note',
                placeholder: 'Enter a note',
            },
            cancel: 'Cancel',
            update: 'Update',
            result: 'Result',
            order: 'Number of interviews',
            date: {
                label: 'Interview time',
                placeholder: ' Select time',
            },
            error: {
                invalidDate: 'Date time must be later than now',
            },
        },
        notification: {
            title: {
                create: 'Notification',
                update: 'Notification',
                delete: 'Delete a schedule',
            },
            success: 'Create a schedule successfully!',
            updateSuccess: 'Update a schedule successfully!',
            fail: 'Create a schedule fail!',
            invalidStatus: 'Only appproved candidate can be add a schedule!',
        },
        order: {
            order1: '1st interview',
            order2: '2nd interview',
        },
        progress: {
            waiting: 'Waiting',
            done: 'Done',
            cancel: 'Cancel',
        },
    },
    create: {
        title: 'Create new candidate',
        pageName: 'Candidate create',
        fields: {
            fullName: {
                label: 'Full name',
                placeholder: 'Enter full name',
            },
            email: {
                label: 'Email',
                placeholder: 'Enter email',
                invalid: 'The Email field format is invalid',
            },
            phoneNumber: {
                label: 'Phone number',
                placeholder: 'Enter phone number',
                invalid: 'Phone number must be 10 or 11 digits',
            },
            birthday: {
                label: 'Birthday',
                placeholder: 'Select a birthday',
            },
            cv: {
                label: 'Upload CV',
            },
            gender: {
                label: 'Gender',
                placeholder: 'Select a gender',
            },
            appliedPosition: {
                label: 'Applied position',
                placeholder: 'Enter applied position',
            },
            level: {
                label: 'Level',
                placeholder: 'Select a level',
            },
            resource: {
                label: 'Resource',
                placeholder: 'Select a resource',
            },
            note: {
                label: 'Note',
                placeholder: 'Note here',
            },
        },
        button: {
            reset: 'Reset',
            submit: 'Save',
        },
        notification: {
            title: 'Notification',
            messageSuccess: 'Create candidate successfully!',
        },
        errorMessage: 'System error',
    },
    title: 'Candidate information',
    candidateEmail: {
        title: 'Sent emails',
        button: {
            edit: 'Edit',
            delete: 'Delete',
        },
        dialog: {
            title: 'Delete email history ?',
            message: 'Are you sure you want to delete email history?',
            cancel: 'Cancel',
            delete: 'Delete',
        },
        table: {
            date: 'Sent at',
            status: 'Status',
            type: 'Type',
            note: 'Note',
            action: 'Action',
            template: 'Template',
        },
        dialogUpdate: {
            type: 'Type',
            placeholder: 'Please select a type',
            title: 'Sending email',
            note: 'Note',
            cancel: 'Cancel',
            update: 'Update',
        },
        notification: {
            sendOk: 'Email has been delivered!',
            sendFail: "Email can't be delivered!",
            updateSuccessfull: 'Update email successfull',
        },
        type: {
            interview: 'Interview',
            salaryOffer: 'Salary Offer',
        },
    },
    sendEmailDialog: {
        upload: 'Click to upload',
        title: 'Send Email',
        template: 'Template',
        subject: 'Subject',
        sendFrom: 'Send from',
        sendTo: 'Send to',
        name: 'Name',
        city: 'City',
        placeholder: 'Please select a template',
        cancel: 'Cancel',
        send: 'Send',
        type: 'Type',
        note: 'Note',
        error: {
            minExpiredReplyDate: 'Expired reply date must be more than now',
            minInterviewAtWithExpiredReplyDate:
                'Interview at must be more than expired reply date',
            minInterviewAtWithoutExpiredReplyDate: 'Interview at must be more than now',
            minStartWorkingDateWithExpiredReplyDate:
                'Start working date must be more than expired reply date',
            minStartWorkingDateWithoutExpiredReplyDate:
                'Start working date must be more than now',
        },
        attributes: {
            common: {
                fullName: 'Full name',
                subject: 'Subject',
                appliedPosition: 'Applied position',
            },
            fullName: {
                label: 'Full name',
                placeholder: 'Enter full name',
            },
            subject: {
                label: 'Subject',
                placeholder: 'Enter subject',
            },
            appliedPosition: {
                label: 'Applied position',
                placeholder: 'Enter applied position',
            },
            attachment: {
                label: 'Attachment',
            },
            expiredReplyDate: {
                label: 'Expired reply date',
                placeholder: 'Choose expired reply date',
            },
            startWorkingDate: {
                label: 'Start working date',
                placeholder: 'Choose start working date',
            },
            interviewAt: {
                label: 'Interview at',
                placeholder: 'Choose interview at',
            },
            gender: {
                male: 'anh',
                female: 'chị',
            },
        },
    },
    history: {
        title: 'Candidate interview histories',
        table: {
            date: 'Time',
            status: 'Status',
            note: 'Note',
        },
        status: {
            cv_reviewing: 'CV reviewing',
            cv_approved: 'CV approved',
            waiting_reply_first_interview: 'Waiting reply first interview',
            first_interview: 'First interview',
            waiting_reply_second_interview: 'Waiting reply second interview',
            second_interview: 'Second interview',
            elected: 'Elected',
            waiting_reply_offer: 'Waiting reply Offer',
            candidate_agree: 'Candidate Agree',
            onboard: 'Onboard',
            not_onboard: 'Not Onboard',
            candidate_reject: 'Candidate reject',
            cv_rejected: 'CV reject',
            interview_fail: 'Interview fail',
            candidate_cancel: 'Candidate cancel',
        },
    },
    footer: {
        approve: 'Approve',
        reject: 'Reject',
        notification: {
            message: {
                cvStatus: {
                    updated: 'CV status has been updated',
                },
                approveSuccess: 'Approved!',
                approveFail: 'Fail to appprove!',
                rejectSuccess: 'Rejected!',
                rejectFail: 'Fail to reject!',
            },
            title: {
                approve: 'Approve candidate',
                reject: 'Reject candidate',
            },
        },
    },
};
