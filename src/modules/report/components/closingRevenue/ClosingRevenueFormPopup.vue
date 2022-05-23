<template>
    <el-dialog
        width="50%"
        v-model="isShowClosingRevenueFormPopUp"
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="closing-revenue-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('report.closingRevenue.createTitle')
                        : $t('report.closingRevenue.updateTitle')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    v-model:value="form.date"
                    :error="translateYupError(form.errors.date)"
                    :isReadonly="true"
                    :label="$t('report.closingRevenue.closingRevenueForm.date')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    v-model:value="form.cashier"
                    :error="translateYupError(form.errors.cashier)"
                    :isReadonly="true"
                    :label="$t('report.closingRevenue.closingRevenueForm.cashier')"
                />
            </div>
            <div class="col-md-4">
                <BaseSingleSelect
                    v-model:value="form.shiftWork"
                    :filterable="true"
                    :options="shiftOptions"
                    :is-required="true"
                    :label="$t('report.closingRevenue.closingRevenueForm.shiftWork')"
                    :error="translateYupError(form.errors.shiftWork)"
                />
            </div>
            <div class="col-md-6">
                <h3>{{ $t('report.closingRevenue.closingRevenueForm.input') }}</h3>
                <BaseInputNumber
                    name="cashAtBeginningOfShift"
                    is-required="true"
                    v-model:value="form.cashAtBeginningOfShift"
                    :label="
                        $t(
                            'report.closingRevenue.closingRevenueForm.cashAtBeginningOfShift',
                        )
                    "
                    :placeholder="
                        $t('report.closingRevenue.placeholder.cashAtBeginningOfShift')
                    "
                    :error="translateYupError(form.errors.cashAtBeginningOfShift)"
                />
                <BaseInputNumber
                    name="billingRevenue"
                    is-required="true"
                    class="readonly-input-text"
                    v-model:value="form.billingRevenue"
                    :label="$t('report.closingRevenue.closingRevenueForm.billingRevenue')"
                    :error="translateYupError(form.errors.billingRevenue)"
                />
            </div>
            <div class="col-md-6">
                <h3>{{ $t('report.closingRevenue.closingRevenueForm.output') }}</h3>
                <BaseInputNumber
                    name="cashAtEndOfShift"
                    is-required="true"
                    v-model:value="form.cashAtEndOfShift"
                    :label="
                        $t('report.closingRevenue.closingRevenueForm.cashAtEndOfShift')
                    "
                    :placeholder="
                        $t('report.closingRevenue.placeholder.cashAtEndOfShift')
                    "
                    :error="translateYupError(form.errors.cashAtEndOfShift)"
                />
                <BaseInputNumber
                    name="bankingRevenue"
                    is-required="true"
                    v-model:value="form.bankingRevenue"
                    :label="$t('report.closingRevenue.closingRevenueForm.bankingRevenue')"
                    :placeholder="$t('report.closingRevenue.placeholder.bankingRevenue')"
                    :error="translateYupError(form.errors.bankingRevenue)"
                />
                <BaseInputNumber
                    name="importMoney"
                    class="readonly-input-text"
                    :isReadonly="true"
                    v-model:value="form.importMoney"
                    :label="$t('report.closingRevenue.closingRevenueForm.importMoney')"
                    :error="translateYupError(form.errors.importMoney)"
                />
            </div>
            <div class="col-md-6">
                <h3>{{ $t('report.closingRevenue.closingRevenueForm.totalInput') }}</h3>
                <BaseInputNumber
                    name="totalInput"
                    class="readonly-input-text"
                    :isReadonly="true"
                    v-model:value="form.totalInput"
                    :label="$t('report.closingRevenue.closingRevenueForm.totalInput')"
                    :error="translateYupError(form.errors.totalInput)"
                />
                <BaseInputNumber
                    name="differenceRevenue"
                    class="readonly-input-text"
                    :isReadonly="true"
                    v-model:value="form.differenceRevenue"
                    :label="
                        $t('report.closingRevenue.closingRevenueForm.differenceRevenue')
                    "
                    :error="translateYupError(form.errors.differenceRevenue)"
                />
            </div>
            <div class="col-md-6">
                <h3>{{ $t('report.closingRevenue.closingRevenueForm.totalOutput') }}</h3>
                <BaseInputNumber
                    name="totalOutput"
                    class="readonly-input-text"
                    :isReadonly="true"
                    v-model:value="form.totalOutput"
                    :label="$t('report.closingRevenue.closingRevenueForm.totalOutput')"
                    :error="translateYupError(form.errors.totalOutput)"
                />
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="$t('report.closingRevenue.closingRevenueForm.note')"
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
                            {{ $t('report.closingRevenue.button.cancel') }}
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
                            {{ $t('report.closingRevenue.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initData } from '../../composition/closingRevenueForm';
import { setup } from 'vue-class-component';
import { reportModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { SHIFT_OPTIONS } from '../../constants';

export default class ClosingRevenueFormPopup extends UtilMixins {
    get shiftOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(SHIFT_OPTIONS);
    }

    form = setup(() => initData());

    get isDisabledSaveButton(): boolean {
        return reportModule.isDisabledSaveButton;
    }

    get isShowClosingRevenueFormPopUp(): boolean {
        return reportModule.isShowClosingRevenueFormPopUp || false;
    }

    set isShowClosingRevenueFormPopUp(val: boolean) {
        reportModule.setIsShowClosingRevenueFormPopUp(val);
    }

    onClickCancel(): void {
        reportModule.setIsShowClosingRevenueFormPopUp(false);
    }

    async closePopup(): Promise<void> {
        reportModule.setIsShowClosingRevenueFormPopUp(false);
        reportModule.setSelectedClosingRevenue(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        reportModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        reportModule.setIsDisabledSaveButton(false);
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
