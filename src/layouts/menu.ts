import { PageName } from '@/common/constants';
import { ISidebar } from '@/common/types';
import {
    User as UserIcon,
    House as HouseIcon,
    Printer as PrinterIcon,
    Key as KeyIcon,
    QuestionFilled as QuestionIcon,
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

const billing: ISidebar = {
    iconComponent: PrinterIcon,
    name: 'common.app.menu.billing.title',
    active: false,
    to: '/billing',
    pageName: PageName.BILLING_PAGE,
    requiredPermissions: [
        `${PermissionResources.BILLING}_${PermissionActions.READ}`,
        `${PermissionResources.BILLING}_${PermissionActions.CREATE}`,
        `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
        `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
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
    iconComponent: QuestionIcon,
    name: 'common.app.menu.tableDiagram.title',
    active: false,
    to: '/table-diagram',
    pageName: PageName.TABLE_DIAGRAM_PAGE,
};

const booking: ISidebar = {
    iconComponent: QuestionIcon,
    name: 'common.app.menu.booking.title',
    active: false,
    to: '/booking',
    pageName: PageName.BOOKING_PAGE,
};

const menuMenu: ISidebar = {
    iconComponent: QuestionIcon,
    name: 'common.app.menu.menu.title',
    active: false,
    children: [
        {
            name: 'common.app.menu.menu.food',
            to: '/food',
            active: false,
            pageName: PageName.MENU_FOOD_PAGE,
            requiredPermissions: [
                `${PermissionResources.USER}_${PermissionActions.READ}`,
                `${PermissionResources.USER}_${PermissionActions.CREATE}`,
                `${PermissionResources.USER}_${PermissionActions.UPDATE}`,
                `${PermissionResources.USER}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.menu.category',
            to: '/category',
            active: false,
            pageName: PageName.MENU_CATEGORY_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
    ],
};
const storeMenu: ISidebar = {
    iconComponent: QuestionIcon,
    name: 'common.app.menu.store.title',
    active: false,
    children: [
        {
            name: 'common.app.menu.store.material',
            to: '/material',
            active: false,
            pageName: PageName.STORE_MATERIAL_PAGE,
            requiredPermissions: [
                `${PermissionResources.USER}_${PermissionActions.READ}`,
                `${PermissionResources.USER}_${PermissionActions.CREATE}`,
                `${PermissionResources.USER}_${PermissionActions.UPDATE}`,
                `${PermissionResources.USER}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.convert',
            to: '/convert-history',
            active: false,
            pageName: PageName.STORE_CONVERT_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.supplier',
            to: '/supplier',
            active: false,
            pageName: PageName.STORE_SUPPLIER_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.import',
            to: '/import-material',
            active: false,
            pageName: PageName.STORE_IMPORT_MATERIAL_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.export',
            to: '/export-material',
            active: false,
            pageName: PageName.STORE_EXPORT_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
        {
            name: 'common.app.menu.store.checkInventory',
            to: '/check-inventory',
            active: false,
            pageName: PageName.STORE_CHECK_INVENTORY_PAGE,
            requiredPermissions: [
                `${PermissionResources.CONTRACT}_${PermissionActions.READ}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.CREATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.UPDATE}`,
                `${PermissionResources.CONTRACT}_${PermissionActions.DELETE}`,
            ],
        },
    ],
};

const payment: ISidebar = {
    iconComponent: QuestionIcon,
    name: 'common.app.menu.payment.title',
    active: false,
    to: '/payment',
    pageName: PageName.PAYMENT_PAGE,
    requiredPermissions: [
        `${PermissionResources.USER}_${PermissionActions.READ}`,
        `${PermissionResources.USER}_${PermissionActions.CREATE}`,
        `${PermissionResources.USER}_${PermissionActions.UPDATE}`,
        `${PermissionResources.USER}_${PermissionActions.DELETE}`,
    ],
};

const reportMenu: ISidebar = {
    iconComponent: QuestionIcon,
    name: 'common.app.menu.report.closingRevenue',
    to: '/closing-revenue',
    active: false,
    pageName: PageName.REPORT_CLOSING_REVENUE_PAGE,
    requiredPermissions: [
        `${PermissionResources.USER}_${PermissionActions.READ}`,
        `${PermissionResources.USER}_${PermissionActions.CREATE}`,
        `${PermissionResources.USER}_${PermissionActions.UPDATE}`,
        `${PermissionResources.USER}_${PermissionActions.DELETE}`,
    ],
};

export const sidebars = [
    dashboard,
    userMenu,
    tableDiagram,
    booking,
    menuMenu,
    storeMenu,
    billing,
    reportMenu,
];
