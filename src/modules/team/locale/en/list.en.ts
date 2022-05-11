export default {
    pageName: 'Team management',
    menuAction: {
        removeTeam: 'Remove',
        editTeam: 'Edit',
        addMember: 'Add member',
        reset: 'Reset',
    },
    filterForm: {
        title: 'Team management',
        emptyMessage: 'No data',
        createTeam: ' Create',
        employees: ' Members',
        sort: {
            title: 'Sort by',
            label: 'Sort',
            placeholder: 'Select a field',
            name: 'Name',
            createdAt: 'Created at',
        },
        position: {
            label: 'Position',
            placeholder: 'Select a position',
            developer: 'Developer',
            infra: 'Infra',
            pm: 'Project manager',
            tester: 'Tester',
            accounting: 'Accounting',
        },
    },
    placeholder: {
        name: 'Enter name',
        description: 'Enter description',
        user: 'Select member',
        order: 'Select order',
    },

    message: {
        title: 'Notification',
        create: {
            success: 'Create team successfully!',
            fail: {
                title: 'Create incompleted',
                mess: 'Please input all required fields!',
            },
        },

        update: {
            success: 'Update team successfully!',
            updateSuccess: 'Success',
            fail: 'Notification',
            cancel: 'Change canceled',
            title: 'Warning',
            confirmAsk: 'Do you want to change information about this team?',
        },

        delete: {
            title: 'Delete team',
            deleteSuccess: 'Success',
            confirmAsk: 'Are you sure you want to delete this team?',
            success: 'Delete team successfully!',
            fail: 'Delete team failed!',
            cancel: 'Delete cancel',
        },

        pagination: {
            size: 'The number of record must be a positive integer',
        },
    },
};
