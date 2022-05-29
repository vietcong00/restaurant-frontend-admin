<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                :label="
                    $t('store.inventoryDetail.inventoryDetailTable.header.nameMaterial')
                "
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.nameMaterial }}
                </template>
            </el-table-column>
            <el-table-column
                prop="inventoryQuantity"
                :label="
                    $t(
                        'store.inventoryDetail.inventoryDetailTable.header.inventoryQuantity',
                    )
                "
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.inventoryQuantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="inventoryUnit"
                :label="
                    $t('store.inventoryDetail.inventoryDetailTable.header.inventoryUnit')
                "
            >
                <template #default="scope">
                    {{ scope.row.inventoryUnit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="damagedQuantity"
                :label="
                    $t(
                        'store.inventoryDetail.inventoryDetailTable.header.damagedQuantity',
                    )
                "
            >
                <template #default="scope">
                    {{ scope.row.damagedQuantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="damagedUnit"
                :label="
                    $t('store.inventoryDetail.inventoryDetailTable.header.damagedUnit')
                "
            >
                <template #default="scope">
                    {{ scope.row.damagedUnit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.inventoryDetail.tooltip.edit')"
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
                            :content="$t('store.inventoryDetail.tooltip.delete')"
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

import { IInventoryDetail } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'check-inventory-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class InventoryDetailTable extends mixins(StoreMixins) {
    get supplierList(): IInventoryDetail[] {
        return [
            {
                id: 1,
                nameMaterial: 'cofe',
                inventoryQuantity: 2,
                inventoryUnit: 'kg',
                damagedQuantity: 1,
                damagedUnit: 'kg',
                note: 'check',
            },
        ];
    }

    created(): void {
        storeModule.getBookings();
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
