export default {
    title: {
        viewByContract: 'View by contract',
        viewByUser: 'View by user',
    },
    pageName: 'Contract page',
    filterForm: {
        title: 'Contract management',
        createContract: 'Create contract',
        search: 'Search',
        employee: {
            label: 'Employee',
            placeholder: 'Select employees',
        },
        startDate: {
            label: 'Start date',
            placeholder: 'Select the start date',
        },
        endDate: {
            label: 'End date',
            placeholder: 'Select the end date',
        },
        type: {
            label: 'Contract type',
            placeholder: 'Select contract types',
        },
        to: 'To',
        url: {
            label: 'Link to contract',
            placeholder: 'Enter url link to contract',
        },
        status: {
            label: 'Status',
            placeholder: 'Select status',
            active: 'Active',
            expired: 'Expired',
            stopped: 'Stopped',
            aboutToExpire: 'About to expire',
        },
        sort: {
            label: 'Sort',
            placeholder: 'Select a field',
            createdAt: 'Created at',
            fullName: 'Full name',
            contractType: 'Contract type',
            startDate: 'Start date',
            endDate: 'End date',
            status: 'Status',
        },
    },
    contractTable: {
        header: {
            employee: 'Employee',
            contractType: 'Contract type',
            startDate: 'Start date',
            endDate: 'End date',
            url: 'Link to contract',
            status: 'Status',
            actions: 'Actions',
        },
        action: {
            edit: 'Edit',
            delete: 'Delete',
        },
        tooltip: {
            edit: 'Edit',
            stop: 'Stop',
            delete: 'Delete',
            expired: 'Expired',
            active: 'Active',
            stopped: 'Stopped',
        },
    },

    deleteContract: {
        confirmPopup: {
            title: 'Delete contract',
            message: 'Are you sure you want to delete this contract?',
        },
        notification: {
            title: 'Notification',
            messageSuccess: 'Delete contract successfully!',
        },
    },
};
