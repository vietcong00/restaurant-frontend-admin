<template>
    <el-tabs :before-leave="handleChangeTab" v-model="activeTab" class="asset-tab">
        <el-tab-pane
            :label="$t('asset.list.title.viewByAsset')"
            :name="ASSET_TABS.VIEW_BY_ASSET"
        >
            <AssetTable />
        </el-tab-pane>
        <el-tab-pane
            :label="$t('asset.list.title.viewByAssignee')"
            :name="ASSET_TABS.VIEW_BY_ASSIGNEE"
        >
            <AssigneeTable />
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { Options } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';
import { DEFAULT_CURRENT_TAB } from '../../constants';
import { AssetMixins } from '../../mixins';
import AssetTable from './AssetTable.vue';
import AssigneeTable from './AssigneeTable.vue';

@Options({
    components: {
        AssetTable,
        AssigneeTable,
    },
})
export default class AssetTab extends mixins(AssetMixins) {
    activeTab = DEFAULT_CURRENT_TAB;

    handleChangeTab(tab: string): void {
        this.$emit('change-tab', tab);
    }
}
</script>
<style lang="scss" scoped>
.asset-tab {
    border-right: 0;
    border-left: 0;

    @media only screen and (max-width: 991.98px) {
        margin: 0 -15px;
    }
}
</style>
