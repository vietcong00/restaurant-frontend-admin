import { SHIFT } from './types';
import yup from '@/plugins/yup/index';
import { INPUT_TEXT_MAX_LENGTH, INPUT_NUMBER_MAX_VALUE, REGEX } from '@/common/constants';

export const ClosingRevenueSortOptions = [
    {
        label: 'billing.list.filterForm.createdAt',
        value: 'createdAt',
    },
    {
        label: 'billing.list.filterForm.name',
        value: 'name',
    },
];

export const SHIFT_OPTIONS = [
    {
        label: 'report.closingRevenue.shiftWork.morningShift',
        value: SHIFT.MORNING_SHIFT,
    },
    {
        label: 'report.closingRevenue.shiftWork.afternoonShift',
        value: SHIFT.AFTERNOON_SHIFT,
    },
];

export const validateClosingRevenueSchema = yup.object({
    date: yup
        .string()
        .matches(REGEX.YYYY_MM_DD_HYPHEN)
        .nullable()
        .required()
        .label('date'),
    shiftWork: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .oneOf(Object.values(SHIFT))
        .nullable()
        .optional(),
    cashier: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('cashier'),
    cashAtBeginningOfShift: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('cashAtBeginningOfShift'),
    billingRevenue: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('billingRevenue'),
    importMoney: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('importMoney'),
    cashAtEndOfShift: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('cashAtEndOfShift'),
    bankingRevenue: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('bankingRevenue'),
    differenceRevenue: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('differenceRevenue'),
    note: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('note'),
});
