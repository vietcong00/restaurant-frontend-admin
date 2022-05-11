<template>
    <BaseSort :sort-options="sortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { OrderDirection } from '@/common/constants';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { SortOptions } from '../constants';
import { tableDiagramModule } from '../store';

@Options({})
export default class EventSort extends Vue {
    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(SortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        tableDiagramModule.setTableQueryString({
            orderBy,
            orderDirection,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await tableDiagramModule.getTables();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
