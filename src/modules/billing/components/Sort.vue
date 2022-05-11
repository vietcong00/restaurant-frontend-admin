<template>
    <BaseSort :sort-options="sortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { OrderDirection } from '@/common/constants';
import { ISelectOptions } from '@/common/types';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { BillingSortOptions } from '../constants';
import { billingModule } from '../store';

@Options({})
export default class BillingSort extends Vue {
    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(BillingSortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        billingModule.setBillingQueryString({
            orderBy,
            orderDirection,
        });
        await billingModule.getBillingList();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
