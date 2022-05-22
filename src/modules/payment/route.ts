import { RouteRecordRaw } from 'vue-router';
import AssetPage from './pages/AssetPage.vue';
import RequestAssetPage from './pages/RequestAssetPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';
export default [
    {
        path: '/asset',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.ASSET_LIST_PAGE,
                component: AssetPage,
                meta: {
                    requiredPermissions: [
                        `${PermissionResources.ASSET}_${PermissionActions.READ}`,
                        `${PermissionResources.ASSET}_${PermissionActions.CREATE}`,
                        `${PermissionResources.ASSET}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.ASSET}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
    {
        path: '/request-asset',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.REQUEST_ASSET_LIST_PAGE,
                component: RequestAssetPage,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.REQUEST_ASSET}_${PermissionActions.READ}`,
                        `${PermissionResources.REQUEST_ASSET}_${PermissionActions.CREATE}`,
                        `${PermissionResources.REQUEST_ASSET}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.REQUEST_ASSET}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
