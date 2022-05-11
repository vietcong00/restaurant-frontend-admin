export default {
    title: 'Schedule to reset the paid leave days of the previous year',
    savePaidLeaveDaysSchedule: {
        message: {
            success: 'Save schedules successfully',
        },
    },
    fields: {
        year: 'Year',
        resetMonth: 'Scheduled month',
    },
    placeholder: {
        resetMonth: 'Select the scheduled month',
    },
    errors: {
        emptyMonth: 'Scheduled month can not be empty',
        emptyYear: 'Year can not be empty',
        duplicate: 'Year has already existed',
    },
};
