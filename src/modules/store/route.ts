import { RouteRecordRaw } from 'vue-router';
import MaterialPage from './pages/MaterialPage.vue';
import ConvertHistoryPage from './pages/ConvertHistoryPage.vue';
import SupplierPage from './pages/SupplierPage.vue';
import ImportMaterialPage from './pages/ImportMaterialPage.vue';
import ImportMaterialDetailPage from './pages/ImportMaterialDetailPage.vue';
import ExportMaterialPage from './pages/ExportMaterialPage.vue';
import ExportMaterialDetailPage from './pages/ExportMaterialDetailPage.vue';
import CheckInventoryPage from './pages/CheckInventoryPage.vue';
import CheckInventoryDetailPage from './pages/CheckInventoryDetailPage.vue';

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
        path: '/convert-history',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_CONVERT_PAGE,
                component: ConvertHistoryPage,
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
        path: '/export-material',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.STORE_EXPORT_PAGE,
                component: ExportMaterialPage,
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
                name: PageName.STORE_EXPORT_MATERIAL_DETAIL_PAGE,
                component: ExportMaterialDetailPage,
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
                component: CheckInventoryDetailPage,
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
