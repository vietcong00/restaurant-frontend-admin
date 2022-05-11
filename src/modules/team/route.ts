import TeamListPage from './pages/TeamListPage.vue';
import CreateTeamPage from './pages/TeamCreatePage.vue';
import UpdateTeamPage from './pages/TeamUpdatePage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/team',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.TEAM_PAGE,
                component: TeamListPage,

                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.TEAM}_${PermissionActions.READ}`,
                        `${PermissionResources.TEAM}_${PermissionActions.CREATE}`,
                        `${PermissionResources.TEAM}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.TEAM}_${PermissionActions.DELETE}`,
                    ],
                },
            },
            {
                path: 'create',
                name: PageName.CREATE_TEAM_PAGE,
                component: CreateTeamPage,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.TEAM}_${PermissionActions.CREATE}`,
                    ],
                },
            },
            {
                path: 'update/:id',
                name: PageName.UPDATE_TEAM_PAGE,
                component: UpdateTeamPage,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.TEAM}_${PermissionActions.UPDATE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
