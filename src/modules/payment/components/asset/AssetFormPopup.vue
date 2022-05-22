<template>
    <el-dialog
        width="50%"
        v-model="isShowAssetFormPopUp"
        @closed="closePopup"
        destroy-on-close
        @open="form.openPopup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('asset.form.title.createAsset')
                        : $t('asset.form.title.updateAsset')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12" v-if="form.isCreate">
                <BaseSingleSelect
                    v-model:value="requestAssetId"
                    :label="$t('asset.list.fields.requestAsset')"
                    :placeholder="$t('asset.form.placeholder.requestAsset')"
                    :options="requestAssetOptions"
                    @change="form.onChangeRequestAsset"
                    :filterable="true"
                />
            </div>
            <div :class="{ 'col-md-6': form.isCreate, 'col-md-12': !form.isCreate }">
                <BaseInputText
                    v-model:value="form.name"
                    :label="$t('asset.list.fields.name')"
                    :error="translateYupError(form.errors.name)"
                    :is-required="true"
                    :placeholder="$t('asset.form.placeholder.name')"
                />
            </div>
            <div class="col-md-6">
                <BaseDatePicker
                    v-model:value="form.purchaseDate"
                    :placeholder="$t('asset.form.placeholder.purchaseDate')"
                    :label="$t('asset.list.fields.purchaseDate')"
                    :error="translateYupError(form.errors.purchaseDate)"
                    :is-required="true"
                    :max-date="minPurchaseDate"
                />
            </div>
            <div class="col-md-6">
                <BaseSingleSelect
                    v-model:value="form.category"
                    :label="$t('asset.list.fields.assetCategory')"
                    :placeholder="$t('asset.form.placeholder.category')"
                    :options="categoryOptions"
                    :is-required="true"
                    :error="translateYupError(form.errors.category)"
                    :filterable="true"
                />
            </div>
            <div class="col-md-6">
                <BaseSingleSelect
                    v-model:value="form.type"
                    :filterable="true"
                    :options="typeOptions"
                    :is-required="true"
                    :label="$t('asset.list.fields.assetType')"
                    :error="translateYupError(form.errors.type)"
                    :placeholder="$t('asset.form.placeholder.type')"
                />
            </div>
            <div class="col-md-6" v-if="form.isCreate">
                <div class="form-group d-flex flex-column">
                    <div class="code">
                        <label class="fw-bold text-start code-label">
                            {{ $t('asset.list.fields.code') }}
                            <span v-if="!form.isAutoGenerateCode" class="mark-required">
                                *
                            </span>
                        </label>
                        <el-checkbox
                            v-model="form.isAutoGenerateCode"
                            :label="$t('asset.list.fields.isAutoGenerateCode')"
                        ></el-checkbox>
                    </div>
                    <div class="w-100 position-relative">
                        <el-input
                            v-model="form.code"
                            :disabled="form.isAutoGenerateCode"
                            :placeholder="$t('asset.form.placeholder.code')"
                            :type="text"
                            :size="medium"
                            :maxlength="TEXT_MAX_LENGTH"
                        />
                        <div
                            class="invalid-feedback text-start"
                            :class="{ 'd-block': form.errors.code }"
                            v-if="!form.isAutoGenerateCode"
                        >
                            {{ translateYupError(form.errors.code) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <BaseSingleSelect
                    :filterable="true"
                    v-model:value="form.assigneeId"
                    :options="assigneeOptions"
                    :is-required="true"
                    :label="$t('asset.list.fields.assignee')"
                    :error="translateYupError(form.errors.assigneeId)"
                    :placeholder="$t('asset.form.placeholder.assignee')"
                />
            </div>
            <div class="col-md-6">
                <BaseInputMoney
                    v-model:value="form.price"
                    :error="translateYupError(form.errors.price)"
                    :placeholder="$t('asset.form.placeholder.price')"
                    :label="$t('asset.list.fields.price')"
                    :is-required="true"
                />
            </div>
            <div class="col-md-6">
                <BaseSingleSelect
                    v-model:value="form.usingStatus"
                    :filterable="true"
                    :options="usingStatusOptions"
                    :is-required="true"
                    :label="$t('asset.list.fields.usingStatus')"
                    :error="translateYupError(form.errors.usingStatus)"
                    :placeholder="$t('asset.form.placeholder.status')"
                />
            </div>
            <div class="col-md-12">
                <BaseInputTextarea
                    v-model:value="form.description"
                    :label="$t('asset.list.fields.description')"
                    :rows="1"
                    :minRows="2"
                    autosize
                    :maxlength="2000"
                    :error="translateYupError(form.errors.description)"
                    :placeholder="$t('asset.form.placeholder.description')"
                />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{ $t('asset.form.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            :disabled="isDisabledSaveButton"
                            type="primary"
                            @click="onClickSaveButton"
                        >
                            {{ $t('asset.form.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { initData } from '../../composition/assetForm';
import { setup } from 'vue-class-component';
import { assetModule } from '../../store/asset.store';
import { ISelectOptions } from '@/common/types';
import { AssetTypeOptions, UsingStatusOptions } from '../../constants';
import { parseLanguageSelectOptions, parseSelectOptions } from '@/utils/helper';
import { UtilMixins } from '@/mixins/utilMixins';
import { appModule } from '@/store/app';
import { DATE_TIME_FORMAT, SupportLanguage } from '@/common/constants';
import moment from 'moment';

export default class CreateContractForm extends UtilMixins {
    get isDisabledSaveButton(): boolean {
        return assetModule.isDisabledSaveButton;
    }

    get isShowAssetFormPopUp(): boolean {
        return assetModule.isShowAssetFormPopUp || false;
    }

    set isShowAssetFormPopUp(val: boolean) {
        assetModule.setIsShowAssetFormPopUp(val);
    }

    get assigneeOptions(): ISelectOptions[] {
        return assetModule.assigneeOptions;
    }

    get categoryOptions(): ISelectOptions[] {
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return parseSelectOptions(
            assetModule.categories.map((pos) => ({
                value: pos.code,
                label: pos.value?.[currentLanguage],
            })),
        );
    }

    get typeOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(AssetTypeOptions);
    }

    get usingStatusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(UsingStatusOptions);
    }

    get requestAssetOptions(): ISelectOptions[] {
        return parseSelectOptions(
            assetModule.requestAssets.map((requestAsset) => ({
                value: requestAsset.id,
                label: `${requestAsset.assignee.fullName} - ${
                    requestAsset.approveQuantity
                } ${requestAsset.name} - ${moment(requestAsset.createdAt).format(
                    DATE_TIME_FORMAT.DD_MM_YYYY_SLASH,
                )}`,
            })),
        );
    }

    get requestAssetId(): number {
        return this.form.requestAssetId as number;
    }

    set requestAssetId(id: number) {
        this.form.setRequestAssetId(id);
    }

    get minPurchaseDate(): string | null {
        return moment().fmDayString();
    }

    form = setup(() => initData());

    closePopup(): void {
        assetModule.setIsShowAssetFormPopUp(false);
        assetModule.setSelectedAsset(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        assetModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        assetModule.setIsDisabledSaveButton(false);
    }
}
</script>
<style lang="scss" scoped>
.text-left {
    text-align: left;
}
.radio {
    display: flex !important;
    margin-top: 10px;
    margin-bottom: 15px;
}
.el-checkbox {
    float: left;
    margin-bottom: 8px;
    height: 20px;
}
.code {
    display: flex;
}
.code-label {
    word-break: break-word;
    width: 30%;
}
:deep .el-input__inner {
    height: 36px !important;
}
@media (max-width: 1455px) {
    .approve-text {
        .form-group {
            :deep(.w-30) {
                width: 35% !important;
            }
        }
    }
}
.mark-required {
    color: red;
}
</style>
