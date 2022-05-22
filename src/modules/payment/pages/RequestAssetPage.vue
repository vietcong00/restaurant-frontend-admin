<template>
    <div class="content">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('asset.list.title.requestAsset')"
            :totalItems="totalRequestAssets"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :isShowCreateButton="isCanCreate"
            @create="createRequestAsset"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <RequestAssetTable />
        <RequestAssetFormPopup />
        <AssetFormPopup />
        <ApprovePopup />
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import FilterForm from '../components/request-asset/FilterForm.vue';
import RequestAssetFormPopup from '../components/request-asset/RequestAssetFormPopup.vue';
import RequestAssetTable from '../components/request-asset/RequestAssetTable.vue';
import Sort from '../components/request-asset/Sort.vue';
import AssetFormPopup from '../components/asset/AssetFormPopup.vue';
import { assetModule } from '@/modules/asset/store/asset.store';
import { Options } from 'vue-class-component';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { requestAssetModule } from '../store/requestAsset.store';
import ApprovePopup from '../components/request-asset/ApprovePopup.vue';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        RequestAssetTable,
        FilterForm,
        Sort,
        RequestAssetFormPopup,
        AssetFormPopup,
        ApprovePopup,
    },
})
export default class RequestAssetPage extends mixins(UtilMixins) {
    isToggleFilterForm = true;

    get totalRequestAssets(): number {
        return requestAssetModule.totalRequestAssets;
    }

    get selectedPage(): number {
        return requestAssetModule.requestAssetQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        requestAssetModule.requestAssetQueryString.page = value;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(requestAssetModule.userPermissions, [
            `${PermissionResources.REQUEST_ASSET}_${PermissionActions.CREATE}`,
        ]);
    }

    created(): void {
        requestAssetModule.clearQueryString();
        this.getData();
    }

    async getData(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await Promise.all([
            assetModule.getAssignees(),
            requestAssetModule.getRequestAssets(),
            assetModule.getCategories(),
            assetModule.getRequestAssets(),
        ]);
        loading.close();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async handlePaginate(): Promise<void> {
        assetModule.setAssetQueryString({
            page: this.selectedPage,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await requestAssetModule.getRequestAssets();
        loading.close();
    }

    createRequestAsset(): void {
        requestAssetModule.setIsShowRequestAssetFormPopUp(true);
    }
}
</script>
