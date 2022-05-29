<template>
    <BaseTableLayout :data="materialList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.material.materialTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="material"
                :label="$t('store.material.materialTable.header.material')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="$t('store.material.materialTable.header.quantity')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.quantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="$t('store.material.materialTable.header.unit')"
            >
                <template #default="scope">
                    {{ scope.row.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="updateAt"
                :label="$t('store.material.materialTable.header.updateAt')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.updateAt }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.material.materialTable.header.actions')"
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

import { IMaterial } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'material-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class MaterialTable extends mixins(StoreMixins) {
    get materialList(): IMaterial[] {
        return [
            {
                id: 1,
                material: 'thịt bò',
                quantity: 2,
                unit: 'kg',
                updateAt: '2022-04-20T17:00:00.000Z',
            },
            {
                id: 2,
                material: 'sữa',
                quantity: 400,
                unit: 'Lit',
                updateAt: '2022-04-20T17:00:00.000Z',
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
