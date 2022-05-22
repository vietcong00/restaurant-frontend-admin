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
                    <div class="col-xl-4 col-md-4 col-12">
                        <BaseInputText
                            v-model:value="filterForm.keyword"
                            :label="$t('asset.list.filterForm.keyword.label')"
                            :placeholder="$t('asset.list.filterForm.keyword.placeholder')"
                        />
                    </div>
                    <div class="col-xl-4 col-md-4 col-12">
                        <BaseMultipleSelect
                            :filterable="true"
                            v-model:value="filterForm.assigneeIds"
                            :label="$t('asset.list.fields.assignee')"
                            :options="assigneeOptions"
                            :placeholder="
                                $t('asset.list.filterForm.assignee.placeholder')
                            "
                        />
                    </div>
                    <div class="col-xl-4 col-md-4 col-12">
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
                </div>
                <div class="row pt-2">
                    <div class="col-xl-4 col-md-4 col-12">
                        <BaseMultipleSelect
                            :filterable="true"
                            v-model:value="filterForm.types"
                            :label="$t('asset.list.fields.assetType')"
                            :options="typeOptions"
                            :placeholder="
                                $t('asset.list.filterForm.assetType.placeholder')
                            "
                        />
                    </div>
                    <div class="col-xl-4 col-md-4 col-12">
                        <BaseMultipleSelect
                            :filterable="true"
                            v-model:value="filterForm.usingStatus"
                            :label="$t('asset.list.fields.usingStatus')"
                            :options="usingStatusOptions"
                            :placeholder="
                                $t('asset.list.filterForm.usingStatus.placeholder')
                            "
                        />
                    </div>
                    <div class="col-xl-4 col-md-4 col-12">
                        <label
                            class="text-start w-100 fw-bold"
                            style="margin-bottom: 8px"
                            >{{
                                $t('asset.list.filterForm.purchaseDateRange.label')
                            }}</label
                        >
                        <el-date-picker
                            v-model="purchaseDateRange"
                            type="daterange"
                            unlink-panels
                            size="medium"
                            :range-separator="
                                $t('asset.list.filterForm.purchaseDateRange.to')
                            "
                            :start-placeholder="
                                $t('asset.list.filterForm.purchaseDateRange.startDate')
                            "
                            :end-placeholder="
                                $t('asset.list.filterForm.purchaseDateRange.endDate')
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
import { parseLanguageSelectOptions, parseSelectOptions } from '@/utils/helper';
import { AssetTypeOptions, UsingStatusOptions } from '../../constants';
import { DEFAULT_FIRST_PAGE, LIMIT_PER_PAGE, SupportLanguage } from '@/common/constants';
import { assetModule } from '@/modules/asset/store/asset.store';
import { Prop } from 'vue-property-decorator';
import { IQueryStringAsset } from '../../types';
import { ISelectOptions } from '@/common/types';
import { ElLoading } from 'element-plus';
import { appModule } from '@/store/app';
import moment from 'moment';
export default class FilterForm extends Vue {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;
    @Prop({ default: true }) readonly isShowCreateButton!: boolean;
    @Prop({ default: '0' }) readonly currentTab!: string;
    filterForm = {
        keyword: '',
        categories: [],
        assigneeIds: [],
        types: [],
        usingStatus: [],
    };

    purchaseDateRange = [];

    get typeOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(AssetTypeOptions);
    }

    get usingStatusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(UsingStatusOptions);
    }

    get assigneeOptions(): ISelectOptions[] {
        return parseSelectOptions(assetModule.assigneeOptions);
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
            assigneeIds: [],
            types: [],
            usingStatus: [],
        };
        this.purchaseDateRange = [];
        assetModule.clearQueryString();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        const query: IQueryStringAsset = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            categories: this.filterForm.categories,
            types: this.filterForm.types,
            keyword: this.filterForm.keyword?.trim(),
            assigneeIds: this.filterForm.assigneeIds,
            usingStatus: this.filterForm.usingStatus,
            purchaseDateRange: this.purchaseDateRange
                ? (this.purchaseDateRange as Date[]).map((date: Date) =>
                      moment(date).utc().fmFullTimeString(),
                  )
                : null,
        };
        assetModule.setAssetQueryString(query);
        const loading = ElLoading.service({
            target: '.content',
        });
        await assetModule.getAssets();
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
.cp-button {
    margin-left: 10px;
    .el-button {
        width: 120px;
    }
}
.form-group {
    margin-bottom: 10px !important;
}
:deep(label) {
    font-size: 13px;
}
</style>
