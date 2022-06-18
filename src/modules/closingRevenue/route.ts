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
                        `${PermissionResources.BILLING}_${PermissionActions.READ}`,
                        `${PermissionResources.BILLING}_${PermissionActions.CREATE}`,
                        `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
