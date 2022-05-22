<template>
    <div>
        <el-dialog
            :title="$t(`asset.list.confirmApprove.updateApproveQuantityTitle`)"
            v-model="isShowImportAssetResultPopUp"
            width="80%"
            custom-class="confirm-dialog"
            destroy-on-close="true"
            @closed="closePopup"
            @open="openPopup"
        >
            <template #title>
                <h3 class="text-left">
                    {{ $t('asset.form.title.importAssetResult') }}
                </h3>
            </template>
            <BaseTableLayout :data="importAssetList">
                <template #table-columns>
                    <el-table-column
                        :label="$t('asset.list.fields.name')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateAssetName(scope.row.assetName)"
                                placement="bottom"
                                v-if="validateAssetName(scope.row.assetName)"
                            >
                                <div class="error w-100">! {{ scope.row.assetName }}</div>
                            </el-tooltip>
                            <div class="w-100" v-else>{{ scope.row.assetName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.purchaseDate')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validatePurchaseDate(scope.row.purchaseDate)"
                                placement="bottom"
                                v-if="validatePurchaseDate(scope.row.purchaseDate)"
                            >
                                <div class="error w-100">
                                    ! {{ scope.row.purchaseDate }}
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>{{ scope.row.purchaseDate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.assetCategory')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateCategory(scope.row.category)"
                                placement="bottom"
                                v-if="validateCategory(scope.row.category)"
                            >
                                <div class="error w-100">
                                    ! {{ getAssetCategory(scope.row.category) }}
                                </div>
                            </el-tooltip>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="
                                    getImportErrorByFieldName(
                                        'category',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                                placement="bottom"
                                v-else-if="
                                    getImportErrorByFieldName(
                                        'category',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                            >
                                <div class="error w-100">
                                    ! {{ getAssetCategory(scope.row.category) }}
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ getAssetCategory(scope.row.category) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.assetType')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateType(scope.row.type)"
                                placement="bottom"
                                v-if="validateType(scope.row.type)"
                            >
                                <div class="error w-100">! {{ scope.row.type }}</div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{
                                    $t(
                                        `asset.list.fieldsValues.assetType.${scope.row.type}`,
                                    )
                                }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.code')"
                        min-width="200"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateCode(scope.row.code, scope.row.index)"
                                placement="bottom"
                                v-if="validateCode(scope.row.code, scope.row.index)"
                            >
                                <div class="error w-100">! {{ scope.row.code }}</div>
                            </el-tooltip>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="
                                    getImportErrorByFieldName(
                                        'code',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                                placement="bottom"
                                v-else-if="
                                    getImportErrorByFieldName(
                                        'code',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                            >
                                <div class="error w-100">! {{ scope.row.code }}</div>
                            </el-tooltip>
                            <div class="w-100" v-else>{{ scope.row.code }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.assignee')"
                        min-width="250"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateAssigneeEmail(scope.row.assigneeEmail)"
                                placement="bottom"
                                v-if="validateAssigneeEmail(scope.row.assigneeEmail)"
                            >
                                <div class="error w-100">
                                    ! {{ scope.row.assigneeEmail }}
                                </div>
                            </el-tooltip>
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="
                                    getImportErrorByFieldName(
                                        'assignee',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                                placement="bottom"
                                v-else-if="
                                    getImportErrorByFieldName(
                                        'assignee',
                                        importErrors?.[scope.row.index]?.errors,
                                    )
                                "
                            >
                                <div class="error w-100">
                                    ! {{ scope.row.assigneeEmail }}
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>{{ scope.row.assigneeEmail }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.price')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validatePrice(scope.row.price)"
                                placement="bottom"
                                v-if="validatePrice(scope.row.price)"
                            >
                                <div class="w-100 error">! {{ +scope.row.price }}</div>
                            </el-tooltip>
                            <div class="w-100" v-else>{{ +scope.row.price }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('asset.list.fields.usingStatus')"
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateUsingStatus(scope.row.usingStatus)"
                                placement="bottom"
                                v-if="validateUsingStatus(scope.row.usingStatus)"
                            >
                                <div class="error w-100">
                                    ! {{ scope.row.usingStatus }}
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{
                                    $t(
                                        `asset.list.filterForm.usingStatus.${scope.row.usingStatus}`,
                                    )
                                }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        :label="$t('asset.list.fields.description')"
                        min-width="250"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="validateDescription(scope.row.description)"
                                placement="bottom"
                                v-if="validateDescription(scope.row.description)"
                            >
                                <div class="error w-100">
                                    ! {{ scope.row.description }}
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.description }}
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </BaseTableLayout>
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
                                :disabled="isDisabledSaveButton || hasError"
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
    </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { assetModule } from '@/modules/asset/store/asset.store';
import { IImportAsset } from '../../types';
import { AssetType, UsingStatus } from '../../constants';
import { assetService } from '../../services/asset-api.services';
import moment from 'moment';
import {
    DATE_TIME_FORMAT,
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
    REGEX,
    SupportLanguage,
    TEXTAREA_MAX_LENGTH,
} from '@/common/constants';
import { appModule } from '@/store/app';
import { ElLoading } from 'element-plus';
import { IImportError, IImportResponse } from '@/common/types';
import { showErrorNotificationFunction } from '@/utils/helper';

@Options({})
export default class ImportAssetResultPopup extends mixins(UtilMixins) {
    importErrors: Record<string, IImportResponse> | null = null;

    isDisabledSaveButton = false;

    get importAssetList(): IImportAsset[] {
        return assetModule.importAssets;
    }

    get isShowImportAssetResultPopUp(): boolean {
        return assetModule.isShowImportAssetResultPopUp;
    }

    get hasError(): boolean {
        let hasError = false;
        this.importAssetList.forEach((importAsset) => {
            const category = assetModule.categories.find(
                (category) =>
                    category.value.en === importAsset.category ||
                    category.value.vi === importAsset.category,
            );

            if (category) {
                importAsset.category = category.code;
            } else {
                hasError = true;
            }

            if (
                this.validateAssetName(importAsset.assetName) ||
                this.validatePurchaseDate(importAsset.purchaseDate) ||
                this.validateCategory(importAsset.category) ||
                this.validateType(importAsset.type) ||
                this.validateUsingStatus(importAsset.usingStatus) ||
                this.validatePrice(importAsset.price) ||
                this.validateAssigneeEmail(importAsset.assigneeEmail) ||
                this.validateCode(importAsset.code, importAsset.index) ||
                this.validateDescription(importAsset.description)
            ) {
                hasError = true;
            }
        });
        return hasError;
    }

    validateAssetName(assetName: string): string {
        if (!assetName) {
            return this.$t('asset.list.import.assetName.required');
        }
        if (assetName?.length > INPUT_TEXT_MAX_LENGTH) {
            return this.$t('asset.list.import.assetName.maxLength');
        }
        return '';
    }

    validateCategory(category: string): string {
        if (!category) {
            return this.$t('asset.list.import.category.required');
        }
        if (!assetModule.categories.map((category) => category.code).includes(category)) {
            return this.$t('asset.list.import.category.invalid');
        }
        return '';
    }

    validateType(type: AssetType): string {
        if (!type) {
            return this.$t('asset.list.import.type.required');
        }
        if (!Object.values(AssetType).includes(type)) {
            return this.$t('asset.list.import.type.invalid');
        }
        return '';
    }

    validateUsingStatus(usingStatus: UsingStatus): string {
        if (!usingStatus) {
            return this.$t('asset.list.import.usingStatus.required');
        }
        if (!Object.values(UsingStatus).includes(usingStatus)) {
            return this.$t('asset.list.import.usingStatus.invalid');
        }
        return '';
    }

    validatePrice(price: number): string {
        if (!price && price !== 0) {
            return this.$t('asset.list.import.price.required');
        }
        if (price <= 0 || isNaN(price)) {
            return this.$t('asset.list.import.price.invalid');
        }
        if (price > INPUT_NUMBER_MAX_VALUE) {
            return this.$t('asset.list.import.price.max');
        }
        return '';
    }

    validateAssigneeEmail(email: string): string {
        if (!email) {
            return this.$t('asset.list.import.assignee.required');
        }
        if (!REGEX.EMAIL.test(email)) {
            return this.$t('asset.list.import.assignee.formatError');
        }
        if (email?.length > INPUT_TEXT_MAX_LENGTH) {
            return this.$t('asset.list.import.assignee.maxLength');
        }
        return '';
    }

    validateCode(code: string, index?: number): string {
        if (
            code &&
            this.importAssetList.some(
                (importAsset) => importAsset.code === code && importAsset.index !== index,
            )
        ) {
            return this.$t('asset.list.import.code.uniqueError');
        }
        if (code?.length > INPUT_TEXT_MAX_LENGTH) {
            return this.$t('asset.list.import.code.maxLength');
        }
        return '';
    }

    validatePurchaseDate(purchaseDate: string): string {
        if (!purchaseDate) {
            return this.$t('asset.list.import.purchaseDate.required');
        }
        if (!moment(purchaseDate, DATE_TIME_FORMAT.DD_MM_YYYY_SLASH).isValid()) {
            return this.$t('asset.list.import.purchaseDate.invalid');
        }
        if (
            moment(purchaseDate, DATE_TIME_FORMAT.DD_MM_YYYY_SLASH)?.isSameOrAfter(
                moment().startOf('day'),
            )
        ) {
            return this.$t('asset.list.import.purchaseDate.afterNow');
        }
        return '';
    }

    validateDescription(description: string): string {
        if (description?.length > TEXTAREA_MAX_LENGTH) {
            return this.$t('asset.list.import.description.maxLength');
        }
        return '';
    }

    getAssetCategory(category: string): string {
        const currentCategory = assetModule.categories.find((cate) => {
            return cate.code === category;
        });
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return currentCategory?.value?.[currentLanguage] || category;
    }

    getImportErrorByFieldName(fieldName: string, errors: IImportError[]): string {
        if (!errors) {
            return '';
        }
        return errors.find((error) => error.column === fieldName)?.errorMessage || '';
    }

    async onClickSaveButton(): Promise<void> {
        this.isDisabledSaveButton = true;
        const importAssets = this.importAssetList.map((importAsset) => {
            return {
                ...importAsset,
                code: importAsset.code?.toString(),
                description: importAsset.description?.toString(),
                price: +importAsset.price,
                purchaseDate: importAsset.purchaseDate
                    ? moment(importAsset.purchaseDate, DATE_TIME_FORMAT.DD_MM_YYYY_SLASH)
                          .utc()
                          .fmFullTimeString()
                    : '',
            };
        });
        const response = await assetService.importAsset({ importAssets: importAssets });

        if (response.success) {
            const importAssetResponses = response.data.results;

            if (
                !Object.keys(importAssetResponses).find(
                    (key) => !importAssetResponses[key].isValid,
                )
            ) {
                this.showSuccessNotification(
                    this.$t('asset.form.message.importAssetSuccess') as string,
                );
                assetModule.setIsShowImportAssetResultPopup(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await assetModule.getRequestAssets();
                await assetModule.getAssets();
                loading.close();
                this.isDisabledSaveButton = false;
            } else {
                this.importErrors = importAssetResponses;
            }
        } else {
            showErrorNotificationFunction(response.message as string);
        }
    }

    openPopup(): void {
        this.isDisabledSaveButton = false;
        this.importErrors = null;
    }

    closePopup(): void {
        assetModule.setIsShowImportAssetResultPopup(false);
        assetModule.setImportAssets([]);
    }
}
</script>

<style lang="scss" scoped>
.error {
    color: rgb(219, 58, 104) !important;
    background-color: rgb(255, 203, 193);
}
.w-100 {
    height: 100%;
    width: 100%;
    padding: 8px 12px;
}
:deep(td.el-table__cell) {
    padding: 0px !important;
    :deep(.cell) {
        height: 100%;
        width: 100%;
        padding: 0px !important;
    }
}
</style>
