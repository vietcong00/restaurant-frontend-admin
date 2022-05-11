<template>
    <div class="recruitment">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('recruitment.list.pageName')"
            :hasSortBox="true"
            :totalItems="totalItems"
            v-model:page="selectedPage"
            @onPaginate="handlePaginate"
            :isShowCreateButton="isCanCreate"
            @create="onClickCreateCandidate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>

        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <RecruitmentTable />
        <CandidateFormPopup
            :isCreate="true"
            v-if="isCanCreateCandidate"
            v-model:editCandidateVisible="isShowCandidateFormPopup"
        />
        <UpdateCandidateStatusFormPopup />
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import RecruitmentTable from '@/modules/recruitment/components/recruitment/RecruitmentTable.vue';
import Sort from '@/modules/recruitment/components/recruitment/Sort.vue';
import FilterForm from '@/modules/recruitment/components/recruitment/FilterForm.vue';
import { Options } from 'vue-class-component';
import { ElLoading } from 'element-plus';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import CandidateFormPopup from '../components/popup/CandidateFormPopup.vue';
import UpdateCandidateStatusFormPopup from '../components/popup/UpdateCandidateStatusPopup.vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { initCandidate, initQueryString, recruitmentModule } from '../store';
import { generalSettingApiService } from '@/modules/setting/services/settingService';
import { SettingKey } from '@/modules/setting/constant';

@Options({
    components: {
        RecruitmentTable,
        FilterForm,
        Sort,
        CandidateFormPopup,
        UpdateCandidateStatusFormPopup,
    },
})
export default class RecruitmentPage extends mixins(UtilMixins) {
    isToggleFilterForm = true;

    get isCanCreateCandidate(): boolean {
        return checkUserHasPermission(recruitmentModule.userPermissions, [
            `${PermissionResources.RECRUITMENT}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return recruitmentModule.queryString.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(page: number) {
        recruitmentModule.setQueryString({ page });
    }

    get totalItems(): number {
        return recruitmentModule.totalCandidates;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(recruitmentModule.userPermissions, [
            `${PermissionResources.RECRUITMENT}_${PermissionActions.CREATE}`,
        ]);
    }

    get isShowCandidateFormPopup(): boolean {
        return recruitmentModule.isShowCandidateFormPopup;
    }

    set isShowCandidateFormPopup(isShow: boolean) {
        recruitmentModule.setIsShowCandidateFormPopup(isShow);
    }

    created(): void {
        recruitmentModule.clearFilter();
        recruitmentModule.setQueryString(initQueryString);
        this.getCandidates();
        this.getPositions();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async handlePaginate(): Promise<void> {
        recruitmentModule.setQueryString({ page: this.selectedPage });
        this.getCandidates();
    }

    async getCandidates(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await recruitmentModule.getCandidates();
        loading.close();

        if (!response?.success) {
            this.showErrorNotification(response.message as string);
        }
    }

    onClickCreateCandidate(): void {
        recruitmentModule.setCandidate(initCandidate);
        recruitmentModule.setIsShowCandidateFormPopup(true);
    }

    async getPositions(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await generalSettingApiService.getGeneralSetting({
            key: SettingKey.APPLIED_POSITION,
        });
        loading.close();
        if (response?.success) {
            recruitmentModule.setAppliedPositionList(response?.data?.values || []);
        }
    }
}
</script>
