export enum AcceptStatus {
    APPROVE = 'APPROVE',
    WAITING_APPROVE = 'WAITING_APPROVE',
    REQUEST_CHECK_AGAIN = 'REQUEST_CHECK_AGAIN',
    CHECKED_AGAIN = 'CHECKED_AGAIN',
    REJECT = 'REJECT',
}

export const SortOptions = [
    {
        label: 'event.list.filterForm.sort.createdAt',
        value: 'createdAt',
    },
    {
        label: 'event.list.filterForm.sort.title',
        value: 'title',
    },
    {
        label: 'event.list.filterForm.sort.status',
        value: 'status',
    },
    {
        label: 'event.list.filterForm.sort.quantity',
        value: 'userQuantity',
    },
];

export const AcceptStatusOptions = [
    {
        label: 'app.acceptStatus.approve',
        value: AcceptStatus.APPROVE,
    },
    {
        label: 'app.acceptStatus.checkedAgain',
        value: AcceptStatus.CHECKED_AGAIN,
    },
    {
        label: 'app.acceptStatus.requestCheckAgain',
        value: AcceptStatus.REQUEST_CHECK_AGAIN,
    },
    {
        label: 'app.acceptStatus.waitingApprove',
        value: AcceptStatus.WAITING_APPROVE,
    },
    {
        label: 'app.acceptStatus.reject',
        value: AcceptStatus.REJECT,
    },
];
