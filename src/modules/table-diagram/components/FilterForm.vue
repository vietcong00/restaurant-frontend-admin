<template>
    <BaseFilterFormLayout
        :isToggleFilterForm="isToggleFilterForm"
        @search="handleFilter"
        @reset="resetFilter"
        @keyup.enter="handleFilter"
    >
        <template #filter-title>
            <h5 class="filter-title">{{ $t('common.app.filterForm.search') }}</h5>
        </template>
        <slot>
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <BaseInputText
                        v-model:value="filterForm.keyword"
                        :placeholder="$t('event.list.placeholder.keyword')"
                        :label="$t('event.list.filterForm.keyword')"
                    />
                </div>
                <div class="col-xl-4 col-md-4 col-12">
                    <label class="text-start w-100 fw-bold" style="margin-bottom: 8px">{{
                        $t('event.list.filterForm.startDateRange')
                    }}</label>
                    <BaseDatePickerRange
                        v-model:value="startDateRange"
                        size="medium"
                        :range-separator="$t('event.list.filterForm.to')"
                        :start-placeholder="$t('event.list.filterForm.startDate')"
                        :end-placeholder="$t('event.list.filterForm.endDate')"
                    />
                </div>
                <div class="col-md-4 col-sm-6">
                    <BaseMultipleSelect
                        v-model:value="filterForm.status"
                        :placeholder="$t('event.list.placeholder.status')"
                        :label="$t('event.list.filterForm.status')"
                        :options="eventStatusOptions"
                    />
                </div>
            </div>
        </slot>
    </BaseFilterFormLayout>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { Vue } from 'vue-class-component';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_SIZE_PER_PAGE,
    LIMIT_PER_PAGE,
} from '@/common/constants';
import { EventStatusOptions } from '../constants';
import { tableDiagramModule } from '../store';
import { IQueryStringEvent } from '../types';
import { Prop } from 'vue-property-decorator';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ISelectOptions } from '@/common/types';

export default class FilterForm extends Vue {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;

    filterForm = {
        page: DEFAULT_FIRST_PAGE,
        limit: LIMIT_PER_PAGE,
        orderBy: DEFAULT_ORDER_BY,
        orderDirection: DEFAULT_ORDER_DIRECTION,
        keyword: '',
        status: [],
    } as IQueryStringEvent;

    startDateRange = [];

    get eventStatusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(EventStatusOptions);
    }

    async resetFilter(): Promise<void> {
        this.filterForm = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            orderBy: DEFAULT_ORDER_BY,
            orderDirection: DEFAULT_ORDER_DIRECTION,
            keyword: '',
            status: [],
        };
        this.startDateRange = [];
        tableDiagramModule.clearQueryString();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        tableDiagramModule.setTableQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
            keyword: this.filterForm.keyword?.trim(),
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await tableDiagramModule.getTables();
        loading.close();
    }
}
</script>

<style lang="scss" scoped>
.filter-title {
    font-weight: bold;
    margin-bottom: 8px;
}
:deep(.form-group) {
    margin-bottom: 0 !important;
}
:deep(label) {
    font-size: 13px;
}
</style>
