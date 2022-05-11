import {
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
} from '@/common/constants';
import yup from '@/plugins/yup/index';

export const TEAM_SIZE_PER_PAGE = 12;

export const USERS_SIZE_TEAM = 10;

export const MIN_MEMBER_ORDER = 0;

export enum UserRole {
    DEVELOPER = 'developer',
    TESTER = 'tester',
    PROJECTMANAGER = 'project manager',
    INFRA = 'infra',
    ACCOUNTING = 'accounting',
}

export const USER_PER_TEAM = 1000;

export const RoleOptions = [
    {
        label: 'team.list.filterForm.position.developer',
        value: UserRole.DEVELOPER,
    },
    {
        label: 'team.list.filterForm.position.tester',
        value: UserRole.TESTER,
    },
    {
        label: 'team.list.filterForm.position.pm',
        value: UserRole.PROJECTMANAGER,
    },
    {
        label: 'team.list.filterForm.position.infra',
        value: UserRole.INFRA,
    },
    {
        label: 'team.list.filterForm.position.accounting',
        value: UserRole.ACCOUNTING,
    },
];

export const SortOptions = [
    {
        label: 'team.list.filterForm.sort.createdAt',
        value: 'createdAt',
    },
    {
        label: 'team.list.filterForm.sort.name',
        value: 'name',
    },
];

export const TeamSchema = yup.object({
    name: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    description: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    usersInfo: yup.array().of(
        yup.object({
            userId: yup.number().positive().max(INPUT_NUMBER_MAX_VALUE).required(),
            userRole: yup.string().oneOf(Object.values(UserRole)).required(),
            order: yup.number().min(0).max(INPUT_NUMBER_MAX_VALUE).default(0).required(),
        }),
    ),
});
