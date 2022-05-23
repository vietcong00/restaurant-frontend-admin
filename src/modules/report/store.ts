import {
    IClosingRevenue,
    IClosingRevenueUpdate,
    IQueryStringClosingRevenue,
    SHIFT,
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

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: '',
    payerIds: [],
};

@Module({ dynamic: true, stateFactory: true, namespaced: true, store, name: 'report' })
class ReportModule extends VuexModule {
    closingRevenueList: IClosingRevenue[] = [];
    totalClosingRevenueList = 0;
    closingRevenueQueryString: IQueryStringClosingRevenue = initQueryString;

    isShowClosingRevenueFormPopUp = false;
    isDisabledSaveButton = false;
    selectedClosingRevenue: IClosingRevenueUpdate | null = null;

    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.BILLING);
    }

    // actions

    @Action
    async getClosingRevenueList(): Promise<void> {
        const closingRevenue: IClosingRevenue[] = [
            {
                id: 1,
                date: '2022-04-04',
                shiftWork: SHIFT.MORNING_SHIFT,
                cashier: {
                    id: 1,
                    name: 'Chi Sở lâm',
                },
                cashAtBeginningOfShift: 4000000,
                billingRevenue: 1200000,
                importMoney: 800000,
                cashAtEndOfShift: 5600000,
                bankingRevenue: 120000,
                differenceRevenue: 50000,
                note: 'Kuuga',
            },
        ];
        this.MUTATE_CLOSING_REVENUE_LIST(closingRevenue);
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
    setSelectedClosingRevenue(closingRevenue: IClosingRevenueUpdate | null) {
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
    MUTATE_SELECTED_CLOSING_REVENUE(closingRevenue: IClosingRevenueUpdate | null) {
        this.selectedClosingRevenue = closingRevenue;
    }
}

export const reportModule = getModule(ReportModule);
