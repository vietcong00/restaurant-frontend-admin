<template>
    <BaseTableLayout :data="billingList">
        <template #table-columns>
            <el-table-column prop="name" :label="$t('billing.form.name')" />
            <el-table-column prop="description" :label="$t('billing.form.description')">
                <template #default="scope">
                    <span class="description">
                        {{ scope.row.description }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="user.fullName"
                width="170"
                :label="$t('billing.form.payerId')"
            />
            <el-table-column
                prop="payDate"
                :label="$t('billing.form.payDate')"
                align="center"
                min-width="120"
            >
                <template #default="scope">
                    {{ parseDateTime(scope.row.payDate) }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('billing.form.url')" min-width="120">
                <template #default="scope">
                    <a
                        class="billing-image"
                        :href="scope.row.url"
                        target="_blank"
                        v-if="scope.row.url"
                        >{{ $t('billing.form.button.clickHere') }}</a
                    >
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                width="150"
                align="center"
                :label="$t('billing.form.action')"
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
import { IBilling, IBillingUpdate } from '../types';
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
        return billingModule.billingList;
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
