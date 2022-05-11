import yup from '@/plugins/yup/index';
import {
    TEXTAREA_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    INPUT_NUMBER_MAX_VALUE,
    INPUT_URL_MAX_LENGTH,
    REGEX,
} from '@/common/constants';
export const BillingSortOptions = [
    {
        label: 'billing.list.filterForm.createdAt',
        value: 'createdAt',
    },
    {
        label: 'billing.list.filterForm.name',
        value: 'name',
    },
];

export const validateBillingSchema = yup.object({
    name: yup.string().trim().required().max(INPUT_TEXT_MAX_LENGTH).label('billingName'),
    description: yup.string().trim().max(TEXTAREA_MAX_LENGTH).nullable().optional(),
    url: yup.string().max(INPUT_URL_MAX_LENGTH).required().url().label('linkImage'),
    payerId: yup
        .number()
        .positive()
        .max(INPUT_NUMBER_MAX_VALUE)
        .required()
        .label('payer'),
    payDate: yup
        .string()
        .matches(REGEX.YYYY_MM_DD_HYPHEN)
        .nullable()
        .required()
        .label('payDate'),
});
