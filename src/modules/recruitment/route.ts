import { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import RecruitmentPage from './pages/RecruitmentPage.vue';
import CandidatePage from './pages/CandidatePage.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/recruitment',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.CANDIDATE_LIST_PAGE,
                component: RecruitmentPage,
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
            {
                path: ':id',
                name: PageName.CANDIDATE_DETAIL_PAGE,
                component: CandidatePage,
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
