<template>
    <BaseSort :sort-options="sortOptions" @handleSort="handleSort" />
</template>

<script lang="ts">
import { AssetSortOptions } from '../../constants';
import { OrderDirection } from '@/common/constants';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { assetModule } from '@/modules/asset/store/asset.store';
import { ISelectOptions } from '@/common/types';
import { IQueryStringAsset } from '../../types';

@Options({})
export default class Sort extends Vue {
    get sortOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(AssetSortOptions);
    }

    async handleSort(orderBy: string, orderDirection: OrderDirection): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const query: IQueryStringAsset = {
            orderBy,
            orderDirection,
        };
        assetModule.setAssetQueryString(query);
        await assetModule.getAssets();
        loading.close();
    }
}
</script>

<style lang="scss" scoped></style>
