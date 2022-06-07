<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.checkInventory.checkInventoryTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="checkTime"
                :label="$t('store.checkInventory.checkInventoryTable.header.checkTime')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ parseDateTimeTime(scope.row.checkTime) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
                :label="
                    $t('store.checkInventory.checkInventoryTable.header.warehouseStaff')
                "
            >
                <template #default="scope">
                    {{ scope.row.warehouseStaff.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                :label="$t('store.checkInventory.checkInventoryTable.header.status')"
            >
                <template #default="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.checkInventory.checkInventoryTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.checkInventory.checkInventoryTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.checkInventory.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateInventory(scope.row.id)"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.checkInventory.tooltip.delete')"
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

import { ICheckInventory } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
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
export default class CheckInventoryTable extends mixins(StoreMixins) {
    get supplierList(): ICheckInventory[] {
        return [
            {
                id: 1,
                checkTime: '2022-04-20T17:00:00.000Z',
                warehouseStaff: {
                    id: 1,
                    name: 'Raiden Shogun',
                },
                status: 'Create',
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

    onClickUpdateInventory(id: number): void {
        this.$router.push(`/check-inventory/${id}`);
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
