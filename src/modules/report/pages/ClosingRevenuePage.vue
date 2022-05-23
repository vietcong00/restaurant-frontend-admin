<template>
    <div>
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('report.closingRevenue.pageName')"
            :totalItems="totalItems"
            :createButtonText="$t('report.closingRevenue.button.create')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            v-model:keyword="keyword"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
            @search="handleFilter"
        >
            <template #sort-box-content>
                <ClosingRevenueSort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ClosingRevenueTable />
        <ClosingRevenuePopup />
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import { Options } from 'vue-class-component';
import ClosingRevenueTable from '../components/closingRevenue/ClosingRevenueTable.vue';
import ClosingRevenueSort from '../components/closingRevenue/Sort.vue';
import ClosingRevenuePopup from '../components/closingRevenue/ClosingRevenueFormPopup.vue';
import FilterForm from '../components/closingRevenue/FilterForm.vue';
import { DEFAULT_FIRST_PAGE, LIMIT_PER_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { reportModule } from '../store';

@Options({
    components: {
        FilterForm,
        ClosingRevenueTable,
        ClosingRevenueSort,
        ClosingRevenuePopup,
    },
})
export default class ClosingRevenuesPage extends mixins(UtilMixins) {
    isShowSearchBox = true;
    isToggleFilterForm = true;

    get totalItems(): number {
        return reportModule.totalClosingRevenueList;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(reportModule.userPermissions, [
            `${PermissionResources.BILLING}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return reportModule.closingRevenueQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        reportModule.closingRevenueQueryString.page = value;
    }

    get keyword(): string {
        return reportModule.closingRevenueQueryString?.keyword || '';
    }

    set keyword(value: string) {
        reportModule.closingRevenueQueryString.keyword = value;
    }

    created(): void {
        reportModule.clearQueryString();
        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const loading = ElLoading.service({});
        Promise.all([reportModule.getClosingRevenueList()]);
        loading.close();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async getClosingRevenueList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await reportModule.getClosingRevenueList();
        loading.close();
    }

    async handleFilter(): Promise<void> {
        reportModule.setClosingRevenueQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            keyword: this.keyword?.trim(),
        });
        await this.getClosingRevenueList();
    }

    async handlePaginate(): Promise<void> {
        reportModule.setClosingRevenueQueryString({
            page: this.selectedPage,
        });
        this.getClosingRevenueList();
    }

    onClickButtonCreate(): void {
        reportModule.setIsShowClosingRevenueFormPopUp(true);
    }
}
</script>
