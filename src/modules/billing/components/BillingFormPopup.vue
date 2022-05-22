<template>
    <el-dialog
        width="50%"
        v-model="isShowBillingFormPopUp"
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="billing-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('billing.form.createTitle')
                        : $t('billing.form.updateTitle')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-4">
                <BaseInputText
                    v-model:value="form.nameCustomer"
                    :error="translateYupError(form.errors.nameCustomer)"
                    :is-required="true"
                    :label="$t('billing.form.billingForm.nameCustomer')"
                    :placeholder="$t('billing.form.placeholder.nameCustomer')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputNumber
                    name="phone"
                    is-required="true"
                    v-model:value="form.phone"
                    :label="$t('billing.form.billingForm.phone')"
                    :placeholder="$t('billing.form.placeholder.phone')"
                    :error="translateYupError(form.errors.phone)"
                />
            </div>
            <div class="col-md-4">
                <BaseSingleSelect
                    v-model:value="form.statusBilling"
                    :filterable="true"
                    :options="statusBillingOptions"
                    :is-required="true"
                    :label="$t('billing.form.billingForm.statusBilling')"
                    :error="translateYupError(form.errors.statusBilling)"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    v-model:value="form.payDate"
                    :error="translateYupError(form.errors.payDate)"
                    :isReadonly="true"
                    :label="$t('billing.form.billingForm.payDate')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    v-model:value="form.paymentMethod"
                    :error="translateYupError(form.errors.paymentMethod)"
                    :isReadonly="true"
                    :label="$t('billing.form.billingForm.paymentMethod')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    v-model:value="form.cashier"
                    :error="translateYupError(form.errors.cashier)"
                    :isReadonly="true"
                    :label="$t('billing.form.billingForm.cashier')"
                />
            </div>
            <div class="col-md-12 mb-3">
                <FoodBillingTable />
            </div>
            <div class="col-md-10 text-end font-weight-bold">
                {{ $t('billing.form.billingForm.total') }}
            </div>
            <div class="col-md-2 text-end">
                {{ parseMoney(totalFoodPrice) }}
            </div>
            <div class="col-md-10 text-end font-weight-bold">
                {{ $t('billing.form.billingForm.vat') }}
            </div>
            <div class="col-md-2 text-end">+&nbsp;{{ parseMoney(vat) }}</div>
            <div class="col-md-10 text-end font-weight-bold">
                {{ $t('billing.form.billingForm.promotion') }}
            </div>
            <div class="col-md-2 text-end">-&nbsp;{{ parseMoney(promotionBilling) }}</div>
            <div class="col-md-10 text-end mt-2 pt-2 font-weight-bold">
                {{ $t('billing.form.billingForm.totalBillingPrice') }}
            </div>
            <div class="col-md-2 d-flex mt-2 justify-content-end">
                <div class="price-text pt-2">{{ parseMoney(totalBillingPrice) }}</div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="onClickCancel">
                            {{ $t('billing.form.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            :disabled="isDisabledSaveButton"
                            type="primary"
                            @click="onClickSaveButton()"
                        >
                            {{ $t('billing.form.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initData } from '../composition/billingForm';
import { Options, setup } from 'vue-class-component';
import { billingModule } from '../store';
import { ISelectOptions } from '@/common/types';
import { UtilMixins } from '@/mixins/utilMixins';
import FoodBillingTable from '../components/FoodBillingTable.vue';
import { STATUS_BILLING_OPTIONS } from '../constants';
import { parseLanguageSelectOptions } from '@/utils/helper';

@Options({
    components: { FoodBillingTable },
})
export default class BillingFormPopup extends UtilMixins {
    STATUS_BILLING_OPTIONS = STATUS_BILLING_OPTIONS;
    get statusBillingOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(STATUS_BILLING_OPTIONS);
    }

    form = setup(() => initData());

    get totalFoodPrice(): number {
        return billingModule.totalFoodPrice;
    }

    get vat(): number {
        return Math.round(this.totalFoodPrice * 0.08);
    }

    get promotionBilling(): number {
        return billingModule.promotionBilling;
    }

    get totalBillingPrice(): number {
        return this.totalFoodPrice + this.vat;
    }

    get isDisabledSaveButton(): boolean {
        return billingModule.isDisabledSaveButton;
    }

    get isShowBillingFormPopUp(): boolean {
        return billingModule.isShowBillingFormPopUp || false;
    }

    set isShowBillingFormPopUp(val: boolean) {
        billingModule.setIsShowBillingFormPopUp(val);
    }

    get payerOptions(): ISelectOptions[] {
        return billingModule.payerOptions;
    }

    onClickCancel(): void {
        billingModule.setIsShowBillingFormPopUp(false);
    }

    async closePopup(): Promise<void> {
        billingModule.setIsShowBillingFormPopUp(false);
        billingModule.setSelectedBilling(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        billingModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        billingModule.setIsDisabledSaveButton(false);
    }

    created(): void {
        billingModule.getFoodBillingList();
    }
}
</script>
<style lang="scss" scoped>
@media (max-width: 1199.98px) {
    :deep(.el-dialog) {
        width: 80%;
    }
}
.text-left {
    text-align: left;
}
.font-weight-bold {
    font-weight: 700;
}
.price-text {
    width: fit-content;
    border-top: 1px solid rgb(126, 126, 126);
}
.readonly-input-text {
    :deep(.el-input__inner) {
        box-shadow: none;
    }
}
</style>
