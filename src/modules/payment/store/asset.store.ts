import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {
    IQueryStringAsset,
    IQueryStringRequestAsset,
    IAsset,
    IUpdateAsset,
    IAssetCategory,
    IRequestAsset,
    IImportAsset,
} from '../types';
import store from '@/store';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_MAX_SIZE_PER_PAGE,
    LIMIT_PER_PAGE,
} from '@/common/constants';
import { commonService } from '@/common/services/api.services';
import { assetService } from '../services/asset-api.services';
import {
    IBodyResponse,
    IGetListResponse,
    ISelectOptions,
    IDropdownUserItem,
} from '@/common/types';
import { appService } from '@/utils/app';
import { PermissionResources } from '../../role/constants';
import { requestAssetService } from '../services/request-asset-api.services';
import { RequestAssetStatus } from '../constants';
import { generalSettingApiService } from '@/modules/setting/services/settingService';
import { SettingKey } from '@/modules/setting/constant';
import { trimObject } from '@/utils/helper';

const initQueryString: IQueryStringAsset = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    keyword: '',
    categories: [],
    assigneeIds: [],
    types: [],
    usingStatus: [],
    orderBy: '',
};

@Module({
    name: 'asset',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    store,
})
class AssetModule extends VuexModule {
    assetList: IAsset[] = [];
    totalAssets = 0;
    categories: IAssetCategory[] = [];
    assigneeOptions: ISelectOptions[] = [];
    assetQueryString: IQueryStringAsset = initQueryString;
    isShowAssetFormPopUp = false;
    isDisabledSaveButton = false;
    selectedAsset: IUpdateAsset | null = null;
    requestAssets: IRequestAsset[] = [];
    isShowImportAssetFilePopup = false;
    importAssets: IImportAsset[] = [];
    isShowImportAssetResultPopUp = false;

    // GETTERS

    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.ASSET);
    }

    @Action
    setSelectedAsset(asset: IUpdateAsset | null) {
        this.MUTATE_SELECTED_ASSET(asset);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    @Action
    async getAssets() {
        const response = (await assetService.getList({
            ...this.assetQueryString,
        })) as IBodyResponse<IGetListResponse<IAsset>>;
        if (response.success) {
            this.MUTATE_ASSETS(response?.data?.items || []);
            this.MUTATE_TOTAL_ASSETS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_ASSETS([]);
            this.MUTATE_TOTAL_ASSETS(0);
        }
    }

    @Action
    async getCategories(): Promise<void> {
        const response = await generalSettingApiService.getGeneralSetting({
            key: SettingKey.ASSET_CATEGORY,
        });
        if (response.success) {
            this.setCategoryList((response.data?.values || []) as IAssetCategory[]);
        } else {
            this.setCategoryList([]);
        }
    }

    @Action
    async setCategoryList(values: IAssetCategory[]) {
        this.MUTATE_CATEGORIES(values || []);
    }

    @Action
    async getAssignees() {
        const response = await commonService.getDropdownUsers();
        if (response.success) {
            this.MUTATE_ASSIGNEE_OPTIONS(response.data?.items || []);
        } else {
            this.MUTATE_ASSIGNEE_OPTIONS([]);
        }
        return response;
    }

    @Action
    setAssetQueryString(query: IQueryStringRequestAsset) {
        this.MUTATE_ASSET_QUERY_STRING(query);
    }

    @Action
    clearQueryString() {
        this.MUTATE_ASSET_QUERY_STRING(initQueryString);
    }

    @Action
    setIsShowAssetFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_ASSET_FORM_POP_UP(value);
    }

    @Action
    async getRequestAssets() {
        const response = (await requestAssetService.getList({
            status: [RequestAssetStatus.APPROVED],
            limit: DEFAULT_MAX_SIZE_PER_PAGE,
        })) as IBodyResponse<IGetListResponse<IRequestAsset>>;
        if (response?.success) {
            this.MUTATE_REQUEST_ASSETS(response.data?.items);
        } else {
            this.MUTATE_REQUEST_ASSETS([]);
        }
    }

    @Action
    setIsOpenImportAssetFilePopup(value: boolean) {
        this.MUTATE_IS_SHOW_IMPORT_ASSET_POP_UP(value);
    }

    @Action
    setImportAssets(importAssets: IImportAsset[]) {
        trimObject(importAssets);
        this.MUTATE_IMPORT_ASSETS(importAssets);
    }

    @Action
    setIsShowImportAssetResultPopup(value: boolean) {
        this.MUTATE_IS_SHOW_IMPORT_ASSET_RESULT_POP_UP(value);
    }

    // MUTATIONS

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_ASSIGNEE_OPTIONS(assigneeOptions: IDropdownUserItem[]) {
        this.assigneeOptions = assigneeOptions.map(function (assignee) {
            return {
                label: assignee.fullName,
                value: assignee.id,
            };
        });
    }

    // MUTATIONS

    @Mutation
    MUTATE_ASSETS(assets: IAsset[]) {
        this.assetList = assets;
    }

    @Mutation
    MUTATE_TOTAL_ASSETS(totalAssets: number) {
        this.totalAssets = totalAssets;
    }

    @Mutation
    MUTATE_ASSET_QUERY_STRING(query: IQueryStringAsset) {
        this.assetQueryString = {
            ...this.assetQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_IS_SHOW_ASSET_FORM_POP_UP(value: boolean) {
        this.isShowAssetFormPopUp = value;
    }

    @Mutation
    MUTATE_CATEGORIES(value: IAssetCategory[]) {
        this.categories = value;
    }

    @Mutation
    MUTATE_SELECTED_ASSET(value: IUpdateAsset | null) {
        this.selectedAsset = value;
    }

    @Mutation
    MUTATE_REQUEST_ASSETS(requestAssets: IRequestAsset[]) {
        this.requestAssets = requestAssets;
    }

    @Mutation
    MUTATE_IS_SHOW_IMPORT_ASSET_POP_UP(value: boolean) {
        this.isShowImportAssetFilePopup = value;
    }

    @Mutation
    MUTATE_IMPORT_ASSETS(importAssets: IImportAsset[]) {
        this.importAssets = importAssets.map((importAsset, index) => {
            return {
                ...importAsset,
                index,
            };
        });
    }

    @Mutation
    MUTATE_IS_SHOW_IMPORT_ASSET_RESULT_POP_UP(value: boolean) {
        this.isShowImportAssetResultPopUp = value;
    }
}

export const assetModule = getModule(AssetModule);
