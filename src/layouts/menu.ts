import { PageName } from '@/common/constants';
import { ISidebar } from '@/common/types';
import {
    User as UserIcon,
    House as HouseIcon,
    Key as KeyIcon,
    Calendar as CalendarIcon,
    HomeFilled as HomeFilledIcon,
    Grid as GridIcon,
} from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
// start dashboardGroup
const dashboard: ISidebar = {
    iconComponent: HouseIcon,
    name: 'common.app.menu.dashboard',
    active: true,
    to: '/dashboard',
    pageName: PageName.DASHBOARD_PAGE,
};
// end dashboardGroup

// start user group
const userMenu: ISidebar = {
    iconComponent: UserIcon,
    name: 'common.app.menu.user.title',
    to: '/user',
    active: false,
    pageName: PageName.USER_PAGE,
    requiredPermissions: [
        `${PermissionResources.USER}_${PermissionActions.READ}`,
        `${PermissionResources.USER}_${PermissionActions.CREATE}`,
        `${PermissionResources.USER}_${PermissionActions.UPDATE}`,
        `${PermissionResources.USER}_${PermissionActions.DELETE}`,
    ],
};

const roleMenu: ISidebar = {
    iconComponent: KeyIcon,
    name: 'common.app.menu.role.title',
    active: false,
    to: '/role',
    pageName: PageName.ROLE_LIST_PAGE,
    requiredPermissions: [
        `${PermissionResources.ROLE}_${PermissionActions.READ}`,
        `${PermissionResources.ROLE}_${PermissionActions.CREATE}`,
        `${PermissionResources.ROLE}_${PermissionActions.UPDATE}`,
        `${PermissionResources.ROLE}_${PermissionActions.DELETE}`,
    ],
};

const tableDiagram: ISidebar = {
    iconComponent: GridIcon,
    name: 'common.app.menu.tableDiagram.title',
    active: false,
    to: '/table-diagram',
    pageName: PageName.TABLE_DIAGRAM_PAGE,
    requiredPermissions: [
        `${PermissionResources.TABLE_DIAGRAM}_${PermissionActions.READ}`,
        `${PermissionResources.TABLE_DIAGRAM}_${PermissionActions.UPDATE}`,
    ],
};

const booking: ISidebar = {
    iconComponent: CalendarIcon,
    name: 'common.app.menu.booking.title',
    active: false,
    to: '/booking',
    pageName: PageName.BOOKING_PAGE,
    requiredPermissions: [
        `${PermissionResources.BOOKING}_${PermissionActions.READ}`,
        `${PermissionResources.BOOKING}_${PermissionActions.CREATE}`,
        `${PermissionResources.BOOKING}_${PermissionActions.UPDATE}`,
    ],
};

const storeMenu: ISidebar = {
    iconComponent: HomeFilledIcon,
    name: 'common.app.menu.store.title',
    active: false,
    children: [
        {
            name: 'common.app.menu.store.material',
            to: '/material',
            active: false,
            pageName: PageName.STORE_MATERIAL_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_MATERIAL}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_MATERIAL}_${PermissionActions.CREATE}`,
                `${PermissionResources.STORE_MATERIAL}_${PermissionActions.UPDATE}`,
                `${PermissionResources.STORE_MATERIAL}_${PermissionActions.DELETE}`,
                `${PermissionResources.STORE_MATERIAL}_${PermissionActions.CONVERT_MATERIAL}`,
            ],
        },
        {
            name: 'common.app.menu.store.convert',
            to: '/convert-history',
            active: false,
            pageName: PageName.STORE_CONVERT_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_CONVERT}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_CONVERT}_${PermissionActions.CREATE}`,
                `${PermissionResources.STORE_CONVERT}_${PermissionActions.CONVERT_MATERIAL}`,
            ],
        },
        {
            name: 'common.app.menu.store.supplier',
            to: '/supplier',
            active: false,
            pageName: PageName.STORE_SUPPLIER_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.CREATE}`,
                `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.UPDATE}`,
                `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.import',
            to: '/import-material',
            active: false,
            pageName: PageName.STORE_IMPORT_MATERIAL_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_IMPORT_MATERIAL}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_IMPORT_MATERIAL}_${PermissionActions.UPDATE}`,
            ],
        },
        {
            name: 'common.app.menu.store.export',
            to: '/export-material',
            active: false,
            pageName: PageName.STORE_EXPORT_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.UPDATE}`,
            ],
        },
        {
            name: 'common.app.menu.store.checkInventory',
            to: '/check-inventory',
            active: false,
            pageName: PageName.STORE_CHECK_INVENTORY_PAGE,
            requiredPermissions: [
                `${PermissionResources.STORE_CHECK_INVENTORY}_${PermissionActions.READ}`,
                `${PermissionResources.STORE_CHECK_INVENTORY}_${PermissionActions.UPDATE}`,
            ],
        },
    ],
};

export const sidebars = [dashboard, userMenu, tableDiagram, booking, storeMenu, roleMenu];
