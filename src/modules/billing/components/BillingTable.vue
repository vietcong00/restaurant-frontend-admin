<template>
    <BaseTableLayout :data="billingList">
        <template #table-columns>
            <el-table-column
                prop="nameCustomer"
                :label="$t('billing.form.billingTable.nameCustomer')"
            />
            <el-table-column
                prop="totalBillingPrice"
                :label="$t('billing.form.billingTable.totalBillingPrice')"
            >
                <template #default="scope">
                    <span class="totalBillingPrice">
                        {{ parseMoney(scope.row.totalBillingPrice) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="payDate"
                :label="$t('billing.form.billingTable.payDate')"
                align="center"
                min-width="120"
            >
                <template #default="scope">
                    {{
                        scope.row.payDate
                            ? parseDateTime(
                                  scope.row.payDate,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                :label="$t('billing.form.billingTable.statusBilling')"
            >
                <template #default="scope">
                    <div
                        :class="`badge status-field badge-md bg-${statusBadge(
                            scope.row.statusBilling,
                        )}`"
                    >
                        {{
                            $t(
                                `billing.list.statusBillingOptions.${scope.row.statusBilling}`,
                            )
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                width="150"
                align="center"
                :label="$t('billing.form.billingTable.action')"
            >
                <template #default="scope">
                    <div
                        class="button-group"
                        :class="checkFullPermissionActions() ? 'group-left' : ''"
                    >
                        <el-tooltip
                            effect="dark"
                            :content="$t('billing.list.tooltip.edit')"
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
                            :content="$t('billing.list.tooltip.delete')"
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
import { billingModule } from '@billing/store';
import { setupDelete } from '../composition/billingList';
import { IBilling, IBillingUpdate, STATUS_BILLING } from '../types';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { UtilMixins } from '@/mixins/utilMixins';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class BillingTable extends mixins(UtilMixins) {
    deleteAction = setup(() => setupDelete());

    get billingList(): IBilling[] {
        // return billingModule.billingList;
        return [
            {
                id: 1,
                nameCustomer: 'Chu Sở Lâm',
                phone: '1231231231',
                totalBillingPrice: 12,
                statusBilling: STATUS_BILLING.WAIT_FOR_PAY,
            },
            {
                id: 2,
                nameCustomer: 'Trương Tam Phong',
                phone: '1231231231',
                totalBillingPrice: 12,
                payDate: '2022-04-04 12:12',
                statusBilling: STATUS_BILLING.PAID,
            },
        ];
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(billingModule.userPermissions, [
            `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(billingModule.userPermissions, [
            `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updateBilling: IBillingUpdate): Promise<void> {
        billingModule.setSelectedBilling(updateBilling);
        billingModule.setIsShowBillingFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteBilling(id);
    }

    checkFullPermissionActions(): boolean {
        return (
            checkUserHasPermission(billingModule.userPermissions, [
                `${PermissionResources.BILLING}_${PermissionActions.DELETE}`,
            ]) &&
            checkUserHasPermission(billingModule.userPermissions, [
                `${PermissionResources.BILLING}_${PermissionActions.UPDATE}`,
            ])
        );
    }

    statusBadge(status: STATUS_BILLING): string {
        switch (status) {
            case STATUS_BILLING.WAIT_FOR_PAY:
                return 'info';
            case STATUS_BILLING.PAID:
                return 'success';
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
