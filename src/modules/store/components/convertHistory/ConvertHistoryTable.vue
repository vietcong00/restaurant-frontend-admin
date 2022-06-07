<template>
    <BaseTableLayout :data="convertHistoryList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.convertHistory.convertHistoryTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="convertTime"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertTime')"
                width="220"
            >
                <template #default="scope">
                    {{
                        scope.row.convertTime
                            ? parseDateTime(
                                  scope.row.convertTime,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                prop="performer"
                :label="$t('store.convertHistory.convertHistoryTable.header.performer')"
                width="175"
            >
                <template #default="scope">
                    {{ scope.row.performer.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="convertFrom"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertFrom')"
                width="175"
            >
                <template #default="scope">
                    {{ scope.row.convertFrom }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantityFrom"
                :label="
                    $t('store.convertHistory.convertHistoryTable.header.quantityFrom')
                "
                width="250"
            >
                <template #default="scope">
                    {{ scope.row.quantityFrom }}
                </template>
            </el-table-column>
            <el-table-column
                prop="convertTo"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertTo')"
                width="175"
            >
                <template #default="scope">
                    {{ scope.row.convertTo }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantityTo"
                :label="$t('store.convertHistory.convertHistoryTable.header.quantityTo')"
                width="250"
            >
                <template #default="scope">
                    {{ scope.row.quantityTo }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.convertHistory.convertHistoryTable.header.note')"
                width="150"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.convertHistory.convertHistoryTable.header.detail')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.convertHistory.tooltip.detail')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateExportMaterial(scope.row.id)"
                            >
                                <DocumentIcon class="action-icon" />
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

import { IConvertHistory } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import { Document as DocumentIcon } from '@element-plus/icons-vue';
import { eventModule } from '@/modules/event/store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'import-material-table-component',
    components: {
        CompIcon,
        DocumentIcon,
    },
})
export default class ExportMaterialTable extends mixins(StoreMixins) {
    get convertHistoryList(): IConvertHistory[] {
        return [
            {
                id: 1,
                convertTime: '2022-04-04 09:09:09',
                convertFrom: 'Box',
                quantityFrom: 4,
                quantityBeforeConvertFrom: 10,
                convertTo: 'can',
                quantityTo: 40,
                quantityBeforeConvertTo: 55,
                performer: {
                    id: 1,
                    name: 'Chu Si Lam',
                },
                note: 'checker',
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

    onClickUpdateExportMaterial(id: number): void {
        storeModule.setIsShowConvertHistoryFormPopUp(true);
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
