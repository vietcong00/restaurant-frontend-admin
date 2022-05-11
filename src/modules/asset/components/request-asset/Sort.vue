<template>
    <BaseSort :sort-options="sortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { RequestAssetSortOptions } from '../../constants';
import { OrderDirection } from '@/common/constants';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { requestAssetModule } from '@/modules/asset/store/requestAsset.store';
import { ISelectOptions } from '@/common/types';
import { IQueryStringRequestAsset } from '../../types';

@Options({})
export default class Sort extends Vue {
    @Prop({ default: false }) readonly isToggleFilterStatus!: boolean;

    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(RequestAssetSortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const query: IQueryStringRequestAsset = {
            orderBy,
            orderDirection,
        };
        requestAssetModule.setRequestAssetQueryString(query);
        await requestAssetModule.getRequestAssets();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
