<template>
    <BaseTableLayout :data="closingRevenueList">
        <template #table-columns>
            <el-table-column
                prop="date"
                :label="$t('report.closingRevenue.closingRevenueTable.date')"
                align="center"
                min-width="150"
            >
                <template #default="scope">
                    {{
                        scope.row.date
                            ? parseDateTime(scope.row.date, YYYY_MM_DD_HYPHEN)
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                width="100"
                :label="$t('report.closingRevenue.closingRevenueTable.shiftWork')"
            >
                <template #default="scope">
                    <div
                        :class="`badge status-field badge-md bg-${shiftBadge(
                            scope.row.shiftWork,
                        )}`"
                    >
                        {{ $t(`report.closingRevenue.shiftWork.${scope.row.shiftWork}`) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="cashier.name"
                :label="$t('report.closingRevenue.closingRevenueTable.cashier')"
                width="150"
            />
            <el-table-column
                prop="cashAtBeginningOfShift"
                :label="
                    $t('report.closingRevenue.closingRevenueTable.cashAtBeginningOfShift')
                "
                width="200"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.cashAtBeginningOfShift) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="billingRevenue"
                :label="$t('report.closingRevenue.closingRevenueTable.billingRevenue')"
                width="200"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.billingRevenue) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importMoney"
                :label="$t('report.closingRevenue.closingRevenueTable.importMoney')"
                width="250"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.importMoney) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="cashAtEndOfShift"
                :label="$t('report.closingRevenue.closingRevenueTable.cashAtEndOfShift')"
                width="200"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.cashAtEndOfShift) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="bankingRevenue"
                :label="$t('report.closingRevenue.closingRevenueTable.bankingRevenue')"
                width="250"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.bankingRevenue) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="differenceRevenue"
                :label="$t('report.closingRevenue.closingRevenueTable.differenceRevenue')"
                width="250"
            >
                <template #default="scope">
                    <div
                        :class="`badge status-field badge-md bg-${differenceRevenueBadge(
                            scope.row.shiftWork,
                        )}`"
                    >
                        {{ parseMoney(scope.row.differenceRevenue) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('report.closingRevenue.closingRevenueTable.note')"
                width="150"
            />
            <el-table-column
                fixed="right"
                width="150"
                align="center"
                :label="$t('report.closingRevenue.closingRevenueTable.action')"
            >
                <template #default="scope">
                    <div
                        class="button-group"
                        :class="checkFullPermissionActions() ? 'group-left' : ''"
                    >
                        <el-tooltip
                            effect="dark"
                            :content="$t('report.closingRevenue.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate"
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
                            :content="$t('report.closingRevenue.tooltip.delete')"
                            placement="top"
                            v-if="isCanDelete"
                        >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="onClickButtonDelete(scope.row.id)"
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
import { Options, setup } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';
import { setupDelete } from '../../composition/closingRevenueList';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { UtilMixins } from '@/mixins/utilMixins';
import { reportModule } from '../../store';
import { IClosingRevenue, IClosingRevenueUpdate, SHIFT } from '../../types';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class ClosingRevenueTable extends mixins(UtilMixins) {
    deleteAction = setup(() => setupDelete());

    get closingRevenueList(): IClosingRevenue[] {
        return reportModule.closingRevenueList;
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(reportModule.userPermissions, [
            `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(reportModule.userPermissions, [
            `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updateClosingRevenue: IClosingRevenueUpdate): Promise<void> {
        reportModule.setSelectedClosingRevenue(updateClosingRevenue);
        reportModule.setIsShowClosingRevenueFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteClosingRevenue(id);
    }

    checkFullPermissionActions(): boolean {
        return (
            checkUserHasPermission(reportModule.userPermissions, [
                `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
            ]) &&
            checkUserHasPermission(reportModule.userPermissions, [
                `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
            ])
        );
    }

    differenceRevenueBadge(difference: number): string {
        if (difference >= 0) return 'success';
        else {
            return 'danger';
        }
    }

    shiftBadge(shift: SHIFT): string {
        switch (shift) {
            case SHIFT.MORNING_SHIFT:
                return 'info';
            case SHIFT.AFTERNOON_SHIFT:
                return 'warning';
            default:
                return '';
        }
    }
}
</script>

<style lang="scss" scoped>
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.group-left {
    justify-content: space-between;
}
.action-icon {
    height: 1em;
    width: 1em;
}

.billing-image {
    text-decoration: underline;
}

.description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
}
</style>
