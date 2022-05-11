import { RouteRecordRaw } from 'vue-router';
import FoodPage from './pages/FoodPage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/food',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.MENU_FOOD_PAGE,
                component: FoodPage,
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
        path: '/category',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.MENU_CATEGORY_PAGE,
                component: CategoryPage,
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
