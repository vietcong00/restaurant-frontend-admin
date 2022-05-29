<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.importMaterial.importMaterialTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="supplier"
                :label="$t('store.importMaterial.importMaterialTable.header.supplier')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ parseDateTimeTime(scope.row.supplier) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
                :label="
                    $t('store.importMaterial.importMaterialTable.header.warehouseStaff')
                "
            >
                <template #default="scope">
                    {{ scope.row.warehouseStaff.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importTime"
                :label="$t('store.importMaterial.importMaterialTable.header.importTime')"
            >
                <template #default="scope">
                    {{
                        scope.row.importTime
                            ? parseDateTime(
                                  scope.row.importTime,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.importMaterial.importMaterialTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.importMaterial.importMaterialTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.importMaterial.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateImportMaterial(scope.row.id)"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.importMaterial.tooltip.delete')"
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

import { IImportMaterial } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'import-material-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class ImportMaterialTable extends mixins(StoreMixins) {
    get supplierList(): IImportMaterial[] {
        return [
            {
                id: 1,
                importTime: '2022-04-20T17:00:00.000Z',
                supplier: 'Winmart',
                warehouseStaff: {
                    id: 1,
                    name: 'Chu Sở Lâm',
                },
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

    onClickUpdateImportMaterial(id: number): void {
        this.$router.push(`/import-material/${id}`);
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
