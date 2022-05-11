export default {
    eventTable: {
        header: {
            id: 'ID',
            title: 'Event name',
            desc: 'Description',
            status: 'Status',
            startDate: 'Start date',
            endDate: 'End date',
            quantity: 'Participant quantity',
            budget: 'Budget',
            actions: 'Actions',
            linkImage: 'Image Link',
            description: 'Description',
        },
        content: {
            linkImage: 'Click here',
        },
    },

    filterForm: {
        keyword: 'Keyword',
        onMonth: 'Month',
        status: 'Status',
        userQuantityRange: 'User quantity',
        budget: 'Budget',
        sort: {
            createdAt: 'Created at',
            title: 'Event name',
            start: 'Start date',
            status: 'Status',
            quantity: 'Participant quantity',
        },
        startDateRange: 'Start date',
        startDate: 'Start date',
        endDate: 'End date',
        to: 'To',
    },

    status: {
        all: 'All',
        incoming: 'Incoming',
        inprogress: 'Inprogress',
        expired: 'Expired',
    },

    placeholder: {
        keyword: 'Enter keyword',
        title: 'Type the name of event',
        desc: 'Type some description about this event',
        img: 'Drop image link here',
        status: 'Select status',
        startDate: 'Select the start date',
        endDate: 'Select the end date',
        quantity: 'The number of participants',
        budget: 'The expectation of budget',
    },

    tooltip: {
        editStatus: 'Edit status',
        edit: 'Edit',
        delete: 'Delete',
    },

    message: {
        title: 'Notification',
        create: {
            success: 'Create event successfully!',
        },

        update: {
            success: 'Update event successfully!',
        },

        delete: {
            title: 'Notification',
            confirmAsk: 'Are you sure you want to delete this event?',
            success: 'Delete event successfully!',
        },
    },

    pageName: 'Event management',
};
