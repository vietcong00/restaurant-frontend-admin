<template>
    <BaseTableLayout
        :data="assetList"
        :objectSpanMethod="objectSpanMethod"
        :border="true"
    >
        <template #table-columns>
            <el-table-column
                prop="assignee.fullName"
                :label="$t('asset.list.fields.assignee')"
                min-width="150"
            />
            <el-table-column
                prop="name"
                :label="$t('asset.list.fields.name')"
                min-width="150"
            />
            <el-table-column
                :label="$t('asset.list.fields.assetCategory')"
                min-width="150"
            >
                <template #default="scope">
                    <span>{{ getAssetCategory(scope.row.category) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="code"
                :label="$t('asset.list.fields.code')"
                min-width="150"
            />
            <el-table-column
                prop="assetType"
                :label="$t('asset.list.fields.assetType')"
                min-width="150"
            >
                <template #default="scope">
                    <span>{{
                        $t(`asset.list.fieldsValues.assetType.${scope.row.type}`)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="usingStatus"
                :label="$t('asset.list.fields.usingStatus')"
                min-width="150"
            >
                <template #default="scope">
                    <span>{{
                        $t(`asset.list.filterForm.usingStatus.${scope.row.usingStatus}`)
                    }}</span>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { assetModule } from '@/modules/asset/store/asset.store';
import { IAsset, IRowSpan } from '../../types';
import { appModule } from '@/store/app';
import { SupportLanguage } from '@/common/constants';
let currentRow = -1;
let currentAssignee = '';
let currentSpanDataIndex = 0;
const lastDataColumn = 3;
export default class RequestAssetTable extends Vue {
    get assetList(): IAsset[] {
        return assetModule.assetList;
    }

    get assetsGroupByAssignee(): Record<string, number | string | boolean>[] {
        const result: Record<string, number | string | boolean>[] = [];
        let currentName = '';
        this.assetList.forEach((asset, index) => {
            if (index === 0) {
                currentName = asset.assignee?.fullName as string;
                result.push({
                    name: currentName,
                    count: 1,
                });
            } else {
                if (currentName === asset.assignee?.fullName) {
                    (result[result.length - 1].count as number)++;
                } else {
                    currentName = asset.assignee?.fullName as string;
                    result.push({
                        name: currentName,
                        count: 1,
                    });
                }
            }
        });
        return result;
    }

    objectSpanMethod(row: IRowSpan): unknown {
        if (
            row?.rowIndex === assetModule.assetList.length - 1 &&
            Number(row?.columnIndex) === lastDataColumn
        ) {
            currentRow = -1;
            currentSpanDataIndex = 0;
        } else if (row?.columnIndex === 0) {
            if (row.rowIndex === 0) {
                currentAssignee = row.row.assignee?.fullName;
                return {
                    rowspan: this.assetsGroupByAssignee[0].count,
                    colspan: 1,
                };
            } else {
                if (row.rowIndex > currentRow) {
                    currentRow = row.rowIndex;
                    if (row.row.assignee?.fullName !== currentAssignee) {
                        currentSpanDataIndex++;
                        currentAssignee = row.row.assignee.fullName;
                        return {
                            rowspan:
                                this.assetsGroupByAssignee[currentSpanDataIndex].count,
                            colspan: 1,
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0,
                        };
                    }
                }
            }
        }
    }

    getAssetCategory(category: string): string {
        const currentCategory = assetModule.categories.find((cate) => {
            return cate.code === category;
        });
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return currentCategory?.value?.[currentLanguage] || '';
    }
}
</script>

<style lang="scss" scoped>
.status-field {
    font-size: 14px;
    width: 100px;
}
.el-table-column {
    width: 25% !important;
}

:deep(.cell) {
    padding-left: 10px !important;
}
</style>
