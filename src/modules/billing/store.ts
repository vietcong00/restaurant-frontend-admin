import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IBilling, IBillingUpdate, IFoodBilling, IQueryStringBilling } from './types';
import { billingService } from './services/api.services';
import {
    IBodyResponse,
    IGetListResponse,
    ISelectOptions,
    IDropdownUserItem,
} from '@/common/types';
import { commonService } from '@/common/services/api.services';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    LIMIT_PER_PAGE,
    WITH_DELETED_OPTION,
    WITH_INACTIVE_OPTION,
} from '@/common/constants';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: '',
    payerIds: [],
};

@Module({ dynamic: true, stateFactory: true, namespaced: true, store, name: 'billing' })
class BillingModule extends VuexModule {
    billingList: IBilling[] = [];
    foodBillingList: IFoodBilling[] = [];
    totalFoodPrice = 0;
    totalBillings = 0;
    promotionBilling = 0;
    payerOptions: ISelectOptions[] = [];
    billingQueryString: IQueryStringBilling = initQueryString;

    isShowBillingFormPopUp = false;
    isDisabledSaveButton = false;
    selectedBilling: IBillingUpdate | null = null;

    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.BILLING);
    }

    // actions

    @Action
    async getPayers() {
        const response = await commonService.getDropdownUsers({
            withDeleted: WITH_DELETED_OPTION.YES,
            withInactive: WITH_INACTIVE_OPTION.YES,
        });
        if (response.success) {
            this.MUTATE_PAYER_OPTIONS(response.data?.items || []);
        } else {
            this.MUTATE_PAYER_OPTIONS([]);
        }
        return response;
    }

    @Action
    async getBillingList(): Promise<IBodyResponse<IGetListResponse<IBilling>>> {
        const response = (await billingService.getList({
            ...this.billingQueryString,
        })) as IBodyResponse<IGetListResponse<IBilling>>;
        if (response.success) {
            this.MUTATE_BILLING_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_BILLING(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_BILLING_LIST([]);
            this.MUTATE_TOTAL_BILLING(0);
        }
        return response;
    }

    @Action
    async getFoodBillingList(): Promise<void> {
        const foodBillings: IFoodBilling[] = [
            {
                id: 1,
                food: {
                    id: 1,
                    foodName: 'Chu Sở Lâm',
                    price: 123321,
                },
                quantity: 12,
                total: 0,
            },
        ];
        let totalFoodPrice = 0;
        foodBillings.forEach((foodBilling) => {
            foodBilling.total = foodBilling.food.price * foodBilling.quantity;
            totalFoodPrice += foodBilling.total;
        });
        this.MUTATE_PROMOTION_BILLING(0);
        this.MUTATE_TOTAL_FOOD_PRICE(totalFoodPrice);
        this.MUTATE_FOOD_BILLING_LIST(foodBillings);
    }

    @Action
    setIsShowBillingFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_BILLING_FORM_POP_UP(value);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    @Action
    setBillingQueryString(query: IQueryStringBilling) {
        this.MUTATE_BILLING_QUERY_STRING(query);
    }

    @Action
    setSelectedBilling(billing: IBillingUpdate | null) {
        this.MUTATE_SELECTED_BILLING(billing);
    }

    @Action
    clearQueryString() {
        this.MUTATE_BILLING_QUERY_STRING(initQueryString);
    }

    // MUTATIONS

    @Mutation
    MUTATE_PAYER_OPTIONS(payerOptions: IDropdownUserItem[]) {
        this.payerOptions = payerOptions.map(function (payer) {
            return {
                label: payer.fullName,
                value: payer.id,
            };
        });
    }

    @Mutation
    MUTATE_BILLING_LIST(billings: IBilling[]) {
        this.billingList = billings;
    }

    @Mutation
    MUTATE_FOOD_BILLING_LIST(foodBillings: IFoodBilling[]) {
        this.foodBillingList = foodBillings;
    }

    @Mutation
    MUTATE_TOTAL_BILLING(totalBillings: number) {
        this.totalBillings = totalBillings;
    }

    @Mutation
    MUTATE_PROMOTION_BILLING(promotionBilling: number) {
        this.promotionBilling = promotionBilling;
    }

    @Mutation
    MUTATE_TOTAL_FOOD_PRICE(totalFoodPrice: number) {
        this.totalFoodPrice = totalFoodPrice;
    }

    @Mutation
    MUTATE_IS_SHOW_BILLING_FORM_POP_UP(value: boolean) {
        this.isShowBillingFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_BILLING_QUERY_STRING(query: IQueryStringBilling) {
        this.billingQueryString = {
            ...this.billingQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_SELECTED_BILLING(billing: IBillingUpdate | null) {
        this.selectedBilling = billing;
    }
}

export const billingModule = getModule(BillingModule);
