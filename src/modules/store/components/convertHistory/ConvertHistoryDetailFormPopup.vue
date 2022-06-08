<template>
    <el-dialog
        width="50%"
        v-model="isShowConvertHistoryFormPopUp"
        @closed="closePopup"
        custom-class="convert-history-detail-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{ $t('store.convertHistory.convertHistoryDialog.title') }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.convertTime"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTime')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.performer.name"
                    :label="$t('store.convertHistory.convertHistoryPopup.performer')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.note"
                    :label="$t('store.convertHistory.convertHistoryPopup.note')"
                />
            </div>
            <div class="col-md-5">
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.convertFrom"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.quantityBeforeConvertFrom"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.quantityFrom"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        selectedConvertHistory.quantityBeforeConvertFrom -
                        selectedConvertHistory.quantityFrom
                    "
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityAfterConvert',
                        )
                    "
                />
            </div>
            <div class="col-md-2">
                <img
                    style="height: 50px; margin-top: 140px"
                    src="@/assets/icons/arrow-right.svg"
                />
            </div>
            <div class="col-md-5">
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.convertTo"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTo')"
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.quantityBeforeConvertTo"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="selectedConvertHistory.quantityTo"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        selectedConvertHistory.quantityBeforeConvertTo +
                        selectedConvertHistory.quantityTo
                    "
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityAfterConvert',
                        )
                    "
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
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { IConvertHistory } from '../../types';
import { storeModule } from '../../store';

export default class ConvertHistoryDetailFormPopup extends UtilMixins {
    get isShowConvertHistoryFormPopUp(): boolean {
        return storeModule.isShowConvertHistoryFormPopUp;
    }

    get selectedConvertHistory(): IConvertHistory {
        return {
            id: 1,
            convertTime: '2022-04-04 09:09:09',
            idMaterialFrom: 1,
            quantityFrom: 4,
            quantityBeforeConvertFrom: 10,
            idMaterialTo: 2,
            quantityTo: 40,
            quantityBeforeConvertTo: 55,
            performer: {
                id: 1,
                name: 'Chu Si Lam',
            },
            note: 'checker',
        };
    }

    onClickCancel(): void {
        storeModule.setIsShowConvertHistoryFormPopUp(false);
    }

    async closePopup(): Promise<void> {
        storeModule.setIsShowConvertHistoryFormPopUp(false);
    }
}
</script>
<style lang="scss" scoped>
.el-dialog {
    width: 80%;
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
