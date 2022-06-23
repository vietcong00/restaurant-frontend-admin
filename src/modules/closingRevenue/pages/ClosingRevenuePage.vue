<template>
    <div>
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('closingRevenue.closingRevenue.pageName')"
            :totalItems="totalItems"
            :createButtonText="$t('closingRevenue.closingRevenue.button.create')"
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
import ClosingRevenueTable from '../components/ClosingRevenueTable.vue';
import ClosingRevenueSort from '../components/Sort.vue';
import ClosingRevenuePopup from '../components/ClosingRevenueFormPopup.vue';
import FilterForm from '../components/FilterForm.vue';
import { DEFAULT_FIRST_PAGE, LIMIT_PER_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { closingRevenueModule } from '../store';

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
        return closingRevenueModule.totalClosingRevenueList;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(closingRevenueModule.userPermissions, [
            `${PermissionResources.CLOSING_REVENUE}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return closingRevenueModule.closingRevenueQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        closingRevenueModule.closingRevenueQueryString.page = value;
    }

    get keyword(): string {
        return closingRevenueModule.closingRevenueQueryString?.keyword || '';
    }

    set keyword(value: string) {
        closingRevenueModule.closingRevenueQueryString.keyword = value;
    }

    created(): void {
        closingRevenueModule.clearQueryString();
        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const loading = ElLoading.service({});
        Promise.all([closingRevenueModule.getClosingRevenueList()]);
        loading.close();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async getClosingRevenueList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await closingRevenueModule.getClosingRevenueList();
        loading.close();
    }

    async handleFilter(): Promise<void> {
        closingRevenueModule.setClosingRevenueQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            keyword: this.keyword?.trim(),
        });
        await this.getClosingRevenueList();
    }

    async handlePaginate(): Promise<void> {
        closingRevenueModule.setClosingRevenueQueryString({
            page: this.selectedPage,
        });
        this.getClosingRevenueList();
    }

    onClickButtonCreate(): void {
        closingRevenueModule.setIsShowClosingRevenueFormPopUp(true);
    }
}
</script>
