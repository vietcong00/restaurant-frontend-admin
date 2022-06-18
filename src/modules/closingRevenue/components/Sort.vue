<template>
    <BaseSort :sort-options="closingRevenueSortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { OrderDirection } from '@/common/constants';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { ClosingRevenueSortOptions } from '../constants';
import { closingRevenueModule } from '../store';

@Options({})
export default class ClosingRevenueSort extends Vue {
    get closingRevenueSortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(ClosingRevenueSortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        closingRevenueModule.setClosingRevenueQueryString({
            orderBy,
            orderDirection,
        });
        await closingRevenueModule.getClosingRevenueList();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
