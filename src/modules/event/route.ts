import { RouteRecordRaw } from 'vue-router';
import EventListPage from './pages/EventListPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/event',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.EVENT_PAGE,
                component: EventListPage,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.EVENT}_${PermissionActions.READ}`,
                        `${PermissionResources.EVENT}_${PermissionActions.CREATE}`,
                        `${PermissionResources.EVENT}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.EVENT}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
