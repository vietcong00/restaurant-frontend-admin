import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IRequestAsset, IQueryStringRequestAsset } from '../types';
import { requestAssetService } from '../services/request-asset-api.services';
import store from '@/store';
import { DEFAULT_FIRST_PAGE, LIMIT_PER_PAGE } from '@/common/constants';
import { appService } from '@/utils/app';
import { PermissionResources } from '../../role/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';

const initQueryString: IQueryStringRequestAsset = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    keyword: '',
    types: [],
    categories: [],
    status: [],
};
@Module({
    name: 'requestAsset',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    store,
})
class RequestAssetModule extends VuexModule {
    requestAssets: IRequestAsset[] = [];
    totalRequestAssets = 0;
    isShowRequestAssetFormPopUp = false;
    selectedRequestAsset: IRequestAsset | null = null;
    isDisabledSaveButton = false;
    isShowApprovePopup = false;
    isDisabledApproveButton = false;

    requestAssetQueryString: IQueryStringRequestAsset = initQueryString;

    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.REQUEST_ASSET);
    }

    // actions

    @Action
    async getRequestAssets() {
        const response = (await requestAssetService.getList({
            ...this.requestAssetQueryString,
        })) as IBodyResponse<IGetListResponse<IRequestAsset>>;
        if (response.success) {
            this.MUTATE_REQUEST_ASSETS(response?.data?.items || []);
            this.MUTATE_TOTAL_REQUEST_ASSETS(response?.data?.totalItems || 0);
        }
    }

    // actions
    @Action
    clearQueryString() {
        this.MUTATE_REQUEST_ASSET_QUERY_STRING(initQueryString);
    }

    @Action
    setRequestAssetQueryString(query: IQueryStringRequestAsset) {
        this.MUTATE_REQUEST_ASSET_QUERY_STRING(query);
    }

    @Action
    setIsShowRequestAssetFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_REQUEST_ASSET_FORM_POP_UP(value);
    }

    @Action
    setSelectedRequestAsset(value: IRequestAsset | null) {
        this.MUTATE_SELECTED_REQUEST_ASSET(value);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    @Action
    setIsShowApprovePopUp(value: boolean) {
        this.MUTATE_IS_SHOW_APPROVE_POP_UP(value);
    }

    @Action
    setIsDisabledApproveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_APPROVE_BUTTON(value);
    }

    // MUTATIONS

    @Mutation
    MUTATE_REQUEST_ASSETS(requestAssets: IRequestAsset[]) {
        this.requestAssets = requestAssets;
    }

    @Mutation
    MUTATE_TOTAL_REQUEST_ASSETS(totalRequestAssets: number) {
        this.totalRequestAssets = totalRequestAssets;
    }

    @Mutation
    MUTATE_IS_SHOW_REQUEST_ASSET_FORM_POP_UP(value: boolean) {
        this.isShowRequestAssetFormPopUp = value;
    }

    @Mutation
    MUTATE_SELECTED_REQUEST_ASSET(value: IRequestAsset | null) {
        this.selectedRequestAsset = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_REQUEST_ASSET_QUERY_STRING(query: IQueryStringRequestAsset) {
        this.requestAssetQueryString = {
            ...this.requestAssetQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_IS_SHOW_APPROVE_POP_UP(value: boolean) {
        this.isShowApprovePopup = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_APPROVE_BUTTON(value: boolean) {
        this.isDisabledApproveButton = value;
    }
}
export const requestAssetModule = getModule(RequestAssetModule);
