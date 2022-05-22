<template>
    <el-dialog
        width="50%"
        v-model="isShowRequestAssetFormPopUp"
        @closed="closePopup"
        @open="form.openPopup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('asset.form.title.createRequestAsset')
                        : $t('asset.form.title.updateRequestAsset')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12">
                <BaseInputText
                    v-model:value="form.name"
                    :label="$t('asset.list.fields.name')"
                    :error="translateYupError(form.errors.name)"
                    :is-required="true"
                    :placeholder="$t('asset.form.placeholder.name')"
                />
            </div>
            <div class="col-md-6">
                <BaseInputMoney
                    v-model:value="form.price"
                    :error="translateYupError(form.errors.price)"
                    :label="$t('asset.list.fields.price')"
                    :is-required="true"
                    :placeholder="$t('asset.form.placeholder.price')"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.requestQuantity"
                    :is-required="true"
                    :label="$t('asset.list.fields.requestQuantity')"
                    :error="translateYupError(form.errors.requestQuantity)"
                    :placeholder="$t('asset.form.placeholder.requestQuantity')"
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
                    :options="typeOptions"
                    :is-required="true"
                    :label="$t('asset.list.fields.assetType')"
                    :error="translateYupError(form.errors.type)"
                    :placeholder="$t('asset.form.placeholder.type')"
                    :filterable="true"
                />
            </div>
            <div class="col-md-12">
                <BaseInputTextarea
                    v-model:value="form.description"
                    :label="$t('asset.list.fields.description')"
                    :error="translateYupError(form.errors.description)"
                    :placeholder="$t('asset.form.placeholder.description')"
                />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center">
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
                            type="primary"
                            :disabled="isDisabledSaveButton"
                            @click="onClickSaveButton()"
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
import { initData } from '../../composition/requestAssetForm';
import { setup } from 'vue-class-component';
import { assetModule } from '../../store/asset.store';
import { ISelectOptions } from '@/common/types';
import { AssetTypeOptions } from '../../constants';
import { parseLanguageSelectOptions, parseSelectOptions } from '@/utils/helper';
import { UtilMixins } from '@/mixins/utilMixins';
import { requestAssetModule } from '../../store/requestAsset.store';
import { appModule } from '@/store/app';
import { SupportLanguage } from '@/common/constants';

export default class CreateRequestAssetForm extends UtilMixins {
    get isDisabledSaveButton(): boolean {
        return requestAssetModule.isDisabledSaveButton;
    }

    get isShowRequestAssetFormPopUp(): boolean {
        return requestAssetModule.isShowRequestAssetFormPopUp || false;
    }

    set isShowRequestAssetFormPopUp(val: boolean) {
        requestAssetModule.setIsShowRequestAssetFormPopUp(val);
    }

    get typeOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(AssetTypeOptions);
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

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        requestAssetModule.setIsShowRequestAssetFormPopUp(false);
        requestAssetModule.setSelectedRequestAsset(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        requestAssetModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        requestAssetModule.setIsDisabledSaveButton(false);
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
.radio {
    display: flex !important;
    margin-top: 10px;
    margin-bottom: 15px;
}
</style>
