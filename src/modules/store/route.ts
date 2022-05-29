import { RouteRecordRaw } from 'vue-router';
import MaterialPage from './pages/MaterialPage.vue';
import ConvertPage from './pages/ConvertPage.vue';
import SupplierPage from './pages/SupplierPage.vue';
import ImportMaterialPage from './pages/ImportMaterialPage.vue';
import ImportMaterialDetailPage from './pages/ImportMaterialDetailPage.vue';
import ExportPage from './pages/ExportPage.vue';
import CheckInventoryPage from './pages/CheckInventoryPage.vue';
import InventoryDetailPage from './pages/InventoryDetailPage.vue';

import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/material',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_MATERIAL_PAGE,
                component: MaterialPage,
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
        path: '/convert',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_CONVERT_PAGE,
                component: ConvertPage,
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
    {
        path: '/supplier',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_SUPPLIER_PAGE,
                component: SupplierPage,
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
    {
        path: '/import-material',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_IMPORT_MATERIAL_PAGE,
                component: ImportMaterialPage,
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
            {
                path: ':id',
                name: PageName.STORE_IMPORT_MATERIAL_DETAIL_PAGE,
                component: ImportMaterialDetailPage,
                props: true,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.READ}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.CREATE}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
    {
        path: '/export',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_EXPORT_PAGE,
                component: ExportPage,
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
    {
        path: '/check-inventory',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_CHECK_INVENTORY_PAGE,
                component: CheckInventoryPage,
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
            {
                path: ':id',
                name: PageName.STORE_INVENTORY_DETAIL_PAGE,
                component: InventoryDetailPage,
                props: true,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.READ}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.CREATE}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.RECRUITMENT}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
