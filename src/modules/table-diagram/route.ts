import { RouteRecordRaw } from 'vue-router';
import TableDiagramPage from './pages/TableDiagramPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/table-diagram',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.TABLE_DIAGRAM_PAGE,
                component: TableDiagramPage,
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
