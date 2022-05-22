<template>
    <div class="content">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('asset.list.title.asset')"
            :totalItems="totalItems"
            :hasSortBox="hasSortBox"
            v-model:page="selectedPage"
            @onPaginate="handlePaginate"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
            <template #custom-button>
                <el-tooltip
                    v-if="isCanCreate"
                    :content="$t('asset.list.import.importAsset')"
                    placement="top"
                >
                    <el-button
                        :style="{
                            backgroundImage: `url(${require('@/assets/icons/btn.export.svg')})`,
                        }"
                        size="medium"
                        type="default"
                        @click="onClickButtonImportAssetFile"
                        class="icon-button"
                    />
                </el-tooltip>
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" :currentTab="currentTab" />
        <AssetTab @change-tab="changeTab"></AssetTab>
        <AssetFormPopup />
        <ImportAssetPopup />
        <ImportAssetResultPopup />
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import FilterForm from '../components/asset/FilterForm.vue';
import AssetTable from '../components/asset/AssetTable.vue';
import AssetFormPopup from '../components/asset/AssetFormPopup.vue';
import AssigneeTable from '../components/asset/AssigneeTable.vue';
import Sort from '../components/asset/Sort.vue';
import { assetModule } from '@asset/store/asset.store';
import { Options } from 'vue-class-component';
import { DEFAULT_FIRST_PAGE, DEFAULT_ORDER_BY } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { DEFAULT_ASSIGNEE_ORDER_BY, DEFAULT_CURRENT_TAB, ASSET_TABS } from '../constants';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import AssetTab from '../components/asset/AssetTab.vue';
import { IQueryStringRequestAsset } from '../types';
import ImportAssetPopup from '../components/asset/ImportAssetPopup.vue';
import ImportAssetResultPopup from '../components/asset/ImportAssetResultPopup.vue';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        AssetTable,
        FilterForm,
        Sort,
        AssigneeTable,
        AssetFormPopup,
        AssetTab,
        ImportAssetPopup,
        ImportAssetResultPopup,
    },
})
export default class AssetPage extends mixins(UtilMixins) {
    isToggleFilterForm = true;
    currentTab = DEFAULT_CURRENT_TAB;

    get totalItems(): number {
        return assetModule.totalAssets;
    }

    get selectedPage(): number {
        return assetModule.assetQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        assetModule.assetQueryString.page = value;
    }

    get hasSortBox(): boolean {
        return this.currentTab === ASSET_TABS.VIEW_BY_ASSET;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(assetModule.userPermissions, [
            `${PermissionResources.ASSET}_${PermissionActions.CREATE}`,
        ]);
    }

    created(): void {
        assetModule.clearQueryString();
        this.getData();
    }

    async getData(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await Promise.all([
            assetModule.getAssignees(),
            assetModule.getAssets(),
            assetModule.getRequestAssets(),
            assetModule.getCategories(),
        ]);
        loading.close();
    }

    async changeTab(tab: ASSET_TABS): Promise<void> {
        this.currentTab = tab;
        const orderBy =
            this.currentTab === ASSET_TABS.VIEW_BY_ASSET
                ? DEFAULT_ORDER_BY
                : DEFAULT_ASSIGNEE_ORDER_BY;
        const query: IQueryStringRequestAsset = {
            orderBy,
        };
        assetModule.setAssetQueryString(query);
        await this.getAssetList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async getAssetList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await assetModule.getAssets();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        assetModule.setAssetQueryString({
            page: this.selectedPage,
        });
        await this.getAssetList();
    }

    onClickButtonCreate(): void {
        assetModule.setIsShowAssetFormPopUp(true);
    }

    onClickButtonImportAssetFile(): void {
        assetModule.setIsOpenImportAssetFilePopup(true);
    }
}
</script>
<style lang="scss" scoped>
.el-tabs--top > .el-tabs__header {
    .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
            margin-left: 20px !important;
            .el-tabs__nav > .el-tabs__active-bar {
                background-color: rgb(255, 196, 0) !important;
                height: 4px !important;
            }
            .el-tabs__nav > .el-tabs__item {
                color: black !important;
            }
        }
    }
    .el-tabs__nav-wrap::after {
        height: 4px !important;
    }
}
.icon-button {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    color: #212121;
    background-position: center;
}
</style>
