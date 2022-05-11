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
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.name"
                    :error="translateYupError(form.errors.name)"
                    :options="userOptions"
                    :is-required="true"
                    :label="$t('billing.form.name')"
                    :placeholder="$t('billing.form.placeholder.name')"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.url"
                    :error="translateYupError(form.errors.url)"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    :is-required="true"
                    :label="$t('billing.form.url')"
                    :placeholder="$t('billing.form.placeholder.url')"
                    :maxLength="INPUT_URL_MAX_LENGTH"
                />
            </div>
            <div class="col-md-6">
                <BaseSingleSelect
                    :filterable="true"
                    v-model:value="form.payerId"
                    :error="translateYupError(form.errors.payerId)"
                    :options="payerOptions"
                    :is-required="true"
                    :label="$t('billing.form.payerId')"
                    :placeholder="$t('billing.form.placeholder.userId')"
                />
            </div>
            <div class="col-md-6">
                <BaseDatePicker
                    v-model:value="form.payDate"
                    :error="translateYupError(form.errors.payDate)"
                    :is-required="true"
                    :label="$t('billing.form.payDate')"
                    :placeholder="$t('billing.form.placeholder.payDate')"
                    :value-format="valueFormat"
                    :min-date="DEFAULT_MIN_DATE"
                    :max-date="new Date()"
                />
            </div>
            <div class="col-md-12">
                <BaseInputTextarea
                    v-model:value="form.description"
                    :error="translateYupError(form.errors.description)"
                    :label="$t('billing.form.description')"
                    :placeholder="$t('billing.form.placeholder.description')"
                />
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
import { setup } from 'vue-class-component';
import { billingModule } from '../store';
import { ISelectOptions } from '@/common/types';
import { UtilMixins } from '@/mixins/utilMixins';

export default class BillingFormPopup extends UtilMixins {
    form = setup(() => initData());

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
}
</script>
<style scoped>
@media (max-width: 1199.98px) {
    :deep(.el-dialog) {
        width: 80%;
    }
}
.text-left {
    text-align: left;
}
</style>
