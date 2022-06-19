import ClosingRevenuePage from './pages/ClosingRevenuePage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/closing-revenue',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.REPORT_CLOSING_REVENUE_PAGE,
                component: ClosingRevenuePage,

                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.CLOSING_REVENUE}_${PermissionActions.READ}`,
                        `${PermissionResources.CLOSING_REVENUE}_${PermissionActions.CREATE}`,
                        `${PermissionResources.CLOSING_REVENUE}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.CLOSING_REVENUE}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
