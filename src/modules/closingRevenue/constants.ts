import { SHIFT } from './types';
import yup from '@/plugins/yup/index';
import {
    INPUT_TEXT_MAX_LENGTH,
    INPUT_NUMBER_MAX_VALUE,
    INPUT_MONEY_MIN_VALUE,
} from '@/common/constants';

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
        label: 'closingRevenue.closingRevenue.shiftWork.morningShift',
        value: SHIFT.MORNING_SHIFT,
    },
    {
        label: 'closingRevenue.closingRevenue.shiftWork.afternoonShift',
        value: SHIFT.AFTERNOON_SHIFT,
    },
];

export const validateClosingRevenueSchema = yup.object({
    shiftWork: yup
        .string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .oneOf(Object.values(SHIFT))
        .nullable()
        .optional(),
    cashAtBeginningOfShift: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('cashAtBeginningOfShift'),
    billingRevenue: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('billingRevenue'),
    importMoney: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('importMoney'),
    exportMoney: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('exportMoney'),
    cashAtEndingOfShift: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('cashAtEndingOfShift'),
    bankingRevenue: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('bankingRevenue'),
    differenceRevenue: yup
        .number()
        .min(INPUT_MONEY_MIN_VALUE)
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('differenceRevenue'),
    note: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('note'),
});
