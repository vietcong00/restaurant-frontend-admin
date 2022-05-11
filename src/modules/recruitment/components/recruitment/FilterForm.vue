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
            <div class="row">
                <div class="col-xl-4 col-md-6 col-12">
                    <BaseInputText
                        v-model:value="keyword"
                        :label="$t('recruitment.list.filterForm.keyword.label')"
                        :placeholder="
                            $t('recruitment.list.filterForm.keyword.placeholder')
                        "
                    />
                </div>
                <div class="col-xl-4 col-md-6 col-12">
                    <label class="text-start w-100 fw-bold" style="margin-bottom: 8px">{{
                        $t('recruitment.list.filterForm.interviewAt.label')
                    }}</label>
                    <BaseDatePickerRange
                        v-model:value="interviewAt"
                        type="datetimerange"
                        :date-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        :value-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        size="medium"
                        :range-separator="
                            $t('recruitment.list.filterForm.interviewAt.to')
                        "
                        :start-placeholder="
                            $t('recruitment.list.filterForm.interviewAt.startDate')
                        "
                        :end-placeholder="
                            $t('recruitment.list.filterForm.interviewAt.endDate')
                        "
                    />
                </div>
                <div class="col-xl-4 col-md-6 col-12">
                    <BaseMultipleSelect
                        :filterable="true"
                        v-model:value="positions"
                        :label="$t('recruitment.list.filterForm.appliedPosition.label')"
                        :options="appliedPositionOptions"
                        :placeholder="
                            $t('recruitment.list.filterForm.appliedPosition.placeholder')
                        "
                    />
                </div>
                <div class="col-xl-4 col-md-6 col-12 pt-2">
                    <BaseMultipleSelect
                        v-model:value="referredSources"
                        :label="$t('recruitment.list.filterForm.source.label')"
                        :options="resourceOptions"
                        :placeholder="
                            $t('recruitment.list.filterForm.source.placeholder')
                        "
                    />
                </div>
                <div class="col-xl-4 col-md-6 col-12 pt-2">
                    <BaseMultipleSelect
                        v-model:value="genders"
                        :label="$t('recruitment.list.filterForm.gender.label')"
                        :options="genderOptions"
                        :placeholder="
                            $t('recruitment.list.filterForm.gender.placeholder')
                        "
                    />
                </div>
                <div class="col-xl-4 col-md-6 col-12 pt-2">
                    <BaseMultipleSelect
                        :filterable="true"
                        v-model:value="statuses"
                        :label="$t('recruitment.list.filterForm.status.label')"
                        :options="statusOptions"
                        :placeholder="
                            $t('recruitment.list.filterForm.status.placeholder')
                        "
                    />
                </div>
            </div>
        </slot>
        <template>
            <el-button type="primary" @click="handleFilter">
                {{ $t('user.list.filterForm.search') }}
            </el-button>
        </template>
    </BaseFilterFormLayout>
</template>

<script lang="ts">
import moment from 'moment';
import {
    StatusOptions,
    LevelOptions,
    ResourceOptions,
    CandidateStatus,
    CandidateResource,
    CandidateGender,
} from '../../constants';
import { GenderOptions } from '@/modules/user/constants';
import { Options } from 'vue-class-component';
import { Prop, mixins } from 'vue-property-decorator';
import { ISelectOptions } from '@/common/types';
import { RecruitmentMixins } from '../../mixins';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { recruitmentModule } from '../../store';
import { DEFAULT_FIRST_PAGE, DEFAULT_SIZE_PER_PAGE } from '@/common/constants';

@Options({})
export default class FilterForm extends mixins(RecruitmentMixins) {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;
    @Prop({ default: true }) readonly isShowCreateButton!: boolean;

    keyword = '';
    statuses: CandidateStatus[] = [];
    referredSources: CandidateResource[] = [];
    genders: CandidateGender[] = [];
    positions: string[] = [];
    interviewAt: Date[] = [];

    get levelOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(LevelOptions);
    }

    get statusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(StatusOptions);
    }

    get genderOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(GenderOptions);
    }

    get resourceOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(ResourceOptions);
    }

    get appliedPositionOptions(): ISelectOptions[] {
        return this.getPositionOptions(recruitmentModule.appliedPositionList);
    }

    async resetFilter(): Promise<void> {
        this.keyword = '';
        this.positions = [];
        this.statuses = [];
        this.referredSources = [];
        this.genders = [];
        this.interviewAt = [];
        recruitmentModule.clearFilter();
        const loading = ElLoading.service({
            target: '.content',
        });
        await recruitmentModule.getCandidates();
        loading.close();
    }

    async handleFilter(): Promise<void> {
        this.keyword = this.keyword?.trim();
        recruitmentModule.setFilterForm({
            keyword: this.keyword,
            positions: this.positions,
            statuses: this.statuses,
            referredSources: this.referredSources,
            genders: this.genders,
            interviewAt: this.interviewAt
                ? (this.interviewAt as Date[]).map((date: Date) =>
                      moment(date).utc().fmFullTimeString(),
                  )
                : null,
        });
        recruitmentModule.setQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await recruitmentModule.getCandidates();
        loading.close();
    }

    onClickCreateButton(): void {
        this.$emit('create');
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
    width: 200px;
}
.el-button--default {
    width: 50px;
}
.mt-20 {
    margin-top: 20px;
    margin-bottom: 10px;
}
:deep(.el-input__inner) {
    width: 100% !important;
}
:deep(.el-range-separator) {
    width: 15% !important;
}
.cp-button {
    margin-left: 10px;
    .el-button {
        width: 120px;
    }
}
:deep(label) {
    font-size: 13px;
}
.form-group {
    margin-bottom: 10px !important;
}
</style>
