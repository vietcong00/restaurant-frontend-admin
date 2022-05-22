<template>
    <BaseFilterFormLayout
        :isToggleFilterForm="isToggleFilterForm"
        @search="handleFilter"
        @reset="resetFilter"
        @keyup.enter="handleFilter"
    >
        <template #filter-title>
            <h5 class="filter-title">
                {{ $t('common.app.filterForm.search') }}
            </h5>
        </template>
        <slot>
            <div class="action-group">
                <div class="row">
                    <div class="col-xl-6 col-md-6 col-12">
                        <BaseInputText
                            v-model:value="filterForm.keyword"
                            :label="$t('asset.list.filterForm.keyword.label')"
                            :placeholder="$t('asset.list.filterForm.keyword.placeholder')"
                        />
                    </div>
                    <div class="col-xl-6 col-md-6 col-12">
                        <BaseMultipleSelect
                            :filterable="true"
                            v-model:value="filterForm.status"
                            :label="$t('asset.list.fields.status')"
                            :options="statusOptions"
                            :placeholder="$t('asset.list.filterForm.status.placeholder')"
                        />
                    </div>
                </div>
                <div class="row pt-2">
                    <div class="col-xl-6 col-md-6 col-12">
                        <BaseMultipleSelect
                            :filterable="true"
                            v-model:value="filterForm.categories"
                            :label="$t('asset.list.fields.assetCategory')"
                            :options="categoryOptions"
                            :placeholder="
                                $t('asset.list.filterForm.assetCategory.placeholder')
                            "
                        />
                    </div>
                    <div class="col-xl-6 col-md-6 col-12">
                        <BaseMultipleSelect
                            v-model:value="filterForm.types"
                            :filterable="true"
                            :label="$t('asset.list.fields.assetType')"
                            :options="typeOptions"
                            :placeholder="
                                $t('asset.list.filterForm.assetType.placeholder')
                            "
                        />
                    </div>
                </div>
            </div>
        </slot>
    </BaseFilterFormLayout>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { AssetTypeOptions, StatusOptions } from '../../constants';
import { requestAssetModule } from '@/modules/asset/store/requestAsset.store';
import { Prop } from 'vue-property-decorator';
import { ISelectOptions } from '@/common/types';
import { DEFAULT_FIRST_PAGE, LIMIT_PER_PAGE, SupportLanguage } from '@/common/constants';
import { parseLanguageSelectOptions, parseSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IQueryStringRequestAsset } from '../../types';
import { appModule } from '@/store/app';
import { assetModule } from '../../store/asset.store';
export default class FilterForm extends Vue {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;
    @Prop({ default: true }) readonly isShowCreateButton!: boolean;
    filterForm = {
        keyword: '',
        categories: [],
        status: [],
        types: [],
    };

    get typeOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(AssetTypeOptions);
    }

    get statusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(StatusOptions);
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

    async resetFilter(): Promise<void> {
        this.filterForm = {
            keyword: '',
            categories: [],
            status: [],
            types: [],
        };
        requestAssetModule.clearQueryString();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        const query: IQueryStringRequestAsset = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            categories: this.filterForm.categories,
            types: this.filterForm.types,
            keyword: this.filterForm.keyword?.trim(),
            status: this.filterForm.status,
        };
        requestAssetModule.setRequestAssetQueryString(query);
        const loading = ElLoading.service({
            target: '.content',
        });
        await requestAssetModule.getRequestAssets();
        loading.close();
    }
}
</script>

<style lang="scss" scoped>
.filter-title {
    font-weight: bold;
    margin-bottom: 8px;
}
.el-input-group {
    margin-top: 30px;
}
.el-button {
    width: 120px;
}
.el-button--default {
    width: 50px;
}
:deep(label) {
    font-size: 13px;
}
.form-group {
    margin-bottom: 10px !important;
}
</style>
