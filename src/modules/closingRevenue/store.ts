import {
    IClosingRevenue,
    IQueryStringClosingRevenue,
    IClosingRevenueUpdateBody,
} from './types';
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    LIMIT_PER_PAGE,
} from '@/common/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';
import { closingRevenueService } from './services/closing-revenue.api.services';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: '',
    payerIds: [],
};

@Module({ dynamic: true, stateFactory: true, namespaced: true, store, name: 'report' })
class ClosingRevenueModule extends VuexModule {
    closingRevenueList: IClosingRevenue[] = [];
    totalClosingRevenueList = 0;
    closingRevenueQueryString: IQueryStringClosingRevenue = initQueryString;

    isShowClosingRevenueFormPopUp = false;
    isDisabledSaveButton = false;
    selectedClosingRevenue: IClosingRevenueUpdateBody | null = null;

    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(
            PermissionResources.CLOSING_REVENUE,
        );
    }

    // actions

    @Action
    async getClosingRevenueList() {
        const response = (await closingRevenueService.getList({
            ...this.closingRevenueQueryString,
        })) as IBodyResponse<IGetListResponse<IClosingRevenue>>;
        if (response.success) {
            this.MUTATE_CLOSING_REVENUE_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_CLOSING_REVENUE(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_CLOSING_REVENUE_LIST([]);
            this.MUTATE_TOTAL_CLOSING_REVENUE(response?.data?.totalItems || 0);
        }
        return response;
    }

    @Action
    setIsShowClosingRevenueFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_CLOSING_REVENUE_FORM_POP_UP(value);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    @Action
    setClosingRevenueQueryString(query: IQueryStringClosingRevenue) {
        this.MUTATE_CLOSING_REVENUE_QUERY_STRING(query);
    }

    @Action
    setSelectedClosingRevenue(closingRevenue: IClosingRevenueUpdateBody | null) {
        this.MUTATE_SELECTED_CLOSING_REVENUE(closingRevenue);
    }

    @Action
    clearQueryString() {
        this.MUTATE_CLOSING_REVENUE_QUERY_STRING(initQueryString);
    }

    // MUTATIONS

    @Mutation
    MUTATE_CLOSING_REVENUE_LIST(closingRevenue: IClosingRevenue[]) {
        this.closingRevenueList = closingRevenue;
    }

    @Mutation
    MUTATE_TOTAL_CLOSING_REVENUE(totalClosingRevenueList: number) {
        this.totalClosingRevenueList = totalClosingRevenueList;
    }

    @Mutation
    MUTATE_IS_SHOW_CLOSING_REVENUE_FORM_POP_UP(value: boolean) {
        this.isShowClosingRevenueFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_CLOSING_REVENUE_QUERY_STRING(query: IQueryStringClosingRevenue) {
        this.closingRevenueQueryString = {
            ...this.closingRevenueQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_SELECTED_CLOSING_REVENUE(closingRevenue: IClosingRevenueUpdateBody | null) {
        this.selectedClosingRevenue = closingRevenue;
    }
}

export const closingRevenueModule = getModule(ClosingRevenueModule);
