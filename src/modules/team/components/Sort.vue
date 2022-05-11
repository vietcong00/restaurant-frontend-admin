<template>
    <BaseSort
        :sort-options="sortOptions"
        :placeholder="$t('team.list.filterForm.sort.placeholder')"
        @handleSort="handleSort"
    />
</template>

<script lang="ts">
import { ISelectOptions } from '@/common/types';
import { OrderDirection } from '@/common/constants';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { SortOptions } from '../constants';
import { teamModule } from '../store';

@Options({})
export default class EventSort extends Vue {
    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(SortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        teamModule.setTeamQueryString({
            orderBy,
            orderDirection,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await teamModule.getTeams();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
