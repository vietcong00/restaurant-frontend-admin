<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.supplier.supplierTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('store.supplier.supplierTable.header.name')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('store.supplier.supplierTable.header.phone')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.phone }}
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('store.supplier.supplierTable.header.address')"
            >
                <template #default="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column
                prop="arrivalTime"
                :label="$t('store.supplier.supplierTable.header.updateAt')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ parseDateTimeTime(scope.row.updateAt) }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.supplier.supplierTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('event.list.tooltip.edit')"
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
                            :content="$t('event.list.tooltip.delete')"
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

import { ISupplier } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'supplier-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class SupplierTable extends mixins(StoreMixins) {
    get supplierList(): ISupplier[] {
        return [
            {
                id: 1,
                name: 'Vinmart',
                phone: '123456789',
                address: '99 Đại La',
                updateAt: '2022-04-20T17:00:00.000Z',
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
