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
                        ? $t('closingRevenue.closingRevenue.createTitle')
                        : $t('closingRevenue.closingRevenue.updateTitle')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    :value="parseDateTime(new Date(), YYYY_MM_DD_HYPHEN_HH_MM_COLON)"
                    :isReadonly="true"
                    :label="$t('closingRevenue.closingRevenue.closingRevenueForm.date')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    class="readonly-input-text"
                    :value="fullNameShiftLeader"
                    :isReadonly="true"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.shiftLeader')
                    "
                />
            </div>
            <div class="col-md-4">
                <BaseSingleSelect
                    v-model:value="form.shift"
                    :filterable="true"
                    :options="shiftOptions"
                    :is-required="true"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.shiftWork')
                    "
                    :error="translateYupError(form.errors.shiftWork)"
                />
            </div>
            <div class="col-md-6">
                <h3>
                    {{ $t('closingRevenue.closingRevenue.closingRevenueForm.input') }}
                </h3>
                <BaseInputNumber
                    name="cashAtBeginningOfShift"
                    is-required="true"
                    v-model:value="form.cashAtBeginningOfShift"
                    :label="
                        $t(
                            'closingRevenue.closingRevenue.closingRevenueForm.cashAtBeginningOfShift',
                        )
                    "
                    :placeholder="
                        $t(
                            'closingRevenue.closingRevenue.placeholder.cashAtBeginningOfShift',
                        )
                    "
                    :error="translateYupError(form.errors.cashAtBeginningOfShift)"
                />
                <BaseInputText
                    name="billingRevenue"
                    is-required="true"
                    class="readonly-input-text"
                    :value="parseMoney(form.billingRevenue)"
                    :label="
                        $t(
                            'closingRevenue.closingRevenue.closingRevenueForm.billingRevenue',
                        )
                    "
                    :error="translateYupError(form.errors.billingRevenue)"
                />
                <BaseInputText
                    name="exportMoney"
                    class="readonly-input-text"
                    :isReadonly="true"
                    :value="parseMoney(form.exportMoney)"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.exportMoney')
                    "
                    :error="translateYupError(form.errors.exportMoney)"
                />
            </div>
            <div class="col-md-6">
                <h3>
                    {{ $t('closingRevenue.closingRevenue.closingRevenueForm.output') }}
                </h3>
                <BaseInputNumber
                    name="cashAtEndingOfShift"
                    is-required="true"
                    v-model:value="form.cashAtEndingOfShift"
                    :label="
                        $t(
                            'closingRevenue.closingRevenue.closingRevenueForm.cashAtEndingOfShift',
                        )
                    "
                    :placeholder="
                        $t(
                            'closingRevenue.closingRevenue.placeholder.cashAtEndingOfShift',
                        )
                    "
                    :error="translateYupError(form.errors.cashAtEndingOfShift)"
                />
                <BaseInputNumber
                    name="bankingRevenue"
                    is-required="true"
                    v-model:value="form.bankingRevenue"
                    :label="
                        $t(
                            'closingRevenue.closingRevenue.closingRevenueForm.bankingRevenue',
                        )
                    "
                    :placeholder="
                        $t('closingRevenue.closingRevenue.placeholder.bankingRevenue')
                    "
                    :error="translateYupError(form.errors.bankingRevenue)"
                />
                <BaseInputText
                    name="importMoney"
                    class="readonly-input-text"
                    :isReadonly="true"
                    :value="parseMoney(form.importMoney)"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.importMoney')
                    "
                    :error="translateYupError(form.errors.importMoney)"
                />
            </div>
            <div class="col-md-6">
                <h3>
                    {{
                        $t('closingRevenue.closingRevenue.closingRevenueForm.totalInput')
                    }}
                </h3>
                <BaseInputText
                    name="totalInput"
                    class="readonly-input-text"
                    :isReadonly="true"
                    :value="parseMoney(calculateTotalInput)"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.totalInput')
                    "
                    :error="translateYupError(form.errors.totalInput)"
                />
                <BaseInputText
                    name="differenceRevenue"
                    class="readonly-input-text"
                    :class="calculateDifference < 0 ? 'text-danger' : 'text-info'"
                    :isReadonly="true"
                    :value="parseMoney(calculateDifference)"
                    :label="
                        $t(
                            'closingRevenue.closingRevenue.closingRevenueForm.differenceRevenue',
                        )
                    "
                    :error="translateYupError(form.errors.differenceRevenue)"
                />
            </div>
            <div class="col-md-6">
                <h3>
                    {{
                        $t('closingRevenue.closingRevenue.closingRevenueForm.totalOutput')
                    }}
                </h3>
                <BaseInputText
                    name="totalOutput"
                    class="readonly-input-text"
                    :isReadonly="true"
                    :value="parseMoney(calculateTotalOutput)"
                    :label="
                        $t('closingRevenue.closingRevenue.closingRevenueForm.totalOutput')
                    "
                    :error="translateYupError(form.errors.totalOutput)"
                />
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="$t('closingRevenue.closingRevenue.closingRevenueForm.note')"
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
                            {{ $t('closingRevenue.closingRevenue.button.cancel') }}
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
                            {{ $t('closingRevenue.closingRevenue.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initData } from '../composition/closingRevenue';
import { setup } from 'vue-class-component';
import { closingRevenueModule } from '../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { SHIFT_OPTIONS } from '../constants';
import { appService } from '@/utils/app';

export default class ClosingRevenueFormPopup extends UtilMixins {
    get shiftOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(SHIFT_OPTIONS);
    }

    form = setup(() => initData());

    get isDisabledSaveButton(): boolean {
        return closingRevenueModule.isDisabledSaveButton;
    }

    get isShowClosingRevenueFormPopUp(): boolean {
        return closingRevenueModule.isShowClosingRevenueFormPopUp || false;
    }

    set isShowClosingRevenueFormPopUp(val: boolean) {
        closingRevenueModule.setIsShowClosingRevenueFormPopUp(val);
    }

    get fullNameShiftLeader(): string {
        return appService.getUser().fullName || '';
    }

    get calculateTotalInput(): number {
        return (
            parseFloat(this.form.cashAtBeginningOfShift as string) +
            parseFloat(this.form.billingRevenue as string) +
            parseFloat(this.form.exportMoney as string)
        );
    }

    get calculateTotalOutput(): number {
        return (
            parseFloat(this.form.cashAtEndingOfShift as string) +
            parseFloat(this.form.bankingRevenue as string) +
            parseFloat(this.form.importMoney as string)
        );
    }

    get calculateDifference(): number {
        return this.calculateTotalInput - this.calculateTotalOutput;
    }

    onClickCancel(): void {
        closingRevenueModule.setIsShowClosingRevenueFormPopUp(false);
    }

    async closePopup(): Promise<void> {
        closingRevenueModule.setIsShowClosingRevenueFormPopUp(false);
        closingRevenueModule.setSelectedClosingRevenue(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        closingRevenueModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        closingRevenueModule.setIsDisabledSaveButton(false);
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
.text-danger {
    :deep(.el-input__inner) {
        font-weight: 700;
        color: red;
    }
}
.text-info {
    :deep(.el-input__inner) {
        font-weight: 700;
        color: blue;
    }
}
</style>
