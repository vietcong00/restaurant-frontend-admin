import {
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
    INPUT_URL_MAX_LENGTH,
    REGEX,
    TEXTAREA_MAX_LENGTH,
} from '@/common/constants';
import yup from '@/plugins/yup/index';

export const userQuantityRange = [[0, 50], [50, 100], [100]];

export enum TableStatus {
    BOOKED = 'booked',
    USED = 'used',
    READY = 'ready',
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

export const ALL_USER_QUANTITY_RANGE = -1;

export const EventSchema = yup.object({
    title: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required().label('eventName'),
    description: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    imageUrl: yup.string().max(INPUT_URL_MAX_LENGTH).required().url().label('linkImage'),
    startDate: yup.string().matches(REGEX.YYYY_MM_DD_HYPHEN).nullable().required(),
    endDate: yup.string().matches(REGEX.YYYY_MM_DD_HYPHEN).nullable().required(),
    userQuantity: yup
        .number()
        .integer()
        .min(0)
        .nullable()
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    budget: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .nullable()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
});

export const SortOption = [
    {
        label: 'Title',
        value: 'title',
    },
    {
        label: 'event.list.header',
    },
];

export const LIMIT_ARRIVAL_TIME_BOOKING = 10800000;
