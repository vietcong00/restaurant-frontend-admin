<template>
    <BaseTableLayout :data="materialExportList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.id')
                "
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.nameMaterial',
                    )
                "
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.nameMaterial }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importPrice"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.exportPrice',
                    )
                "
                sortable="custom"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.exportPrice) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.quantity',
                    )
                "
            >
                <template #default="scope">
                    {{ scope.row.quantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.unit')
                "
            >
                <template #default="scope">
                    {{ scope.row.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.note')
                "
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.actions',
                    )
                "
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.exportMaterialDetail.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickButtonEdit(scope.row)"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.exportMaterialDetail.tooltip.delete')"
                            placement="top"
                            v-if="isCanDelete(scope.row?.status)"
                        >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="onClickButtonDelete(scope.row?.id)"
                            >
                                <DeleteIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IExportMaterialDetail } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'import-material-detail-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class ExportMaterialDetailTable extends mixins(StoreMixins) {
    get materialExportList(): IExportMaterialDetail[] {
        return [
            {
                id: 1,
                nameMaterial: 'coca',
                exportPrice: 200000,
                quantity: 2,
                unit: 'kg',
                note: 'check',
            },
        ];
    }

    isCanDelete(): boolean {
        return checkUserHasPermission(eventModule.userPermissions, [
            `${PermissionResources.EVENT}_${PermissionActions.DELETE}`,
        ]);
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(eventModule.userPermissions, [
            `${PermissionResources.EVENT}_${PermissionActions.UPDATE}`,
        ]);
    }
}
</script>

<style lang="scss" scoped>
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}

.action-icon {
    height: 1em;
    width: 1em;
}
</style>
