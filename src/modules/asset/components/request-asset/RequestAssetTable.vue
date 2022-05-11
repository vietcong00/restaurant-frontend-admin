<template>
    <BaseTableLayout :data="requestAssetList">
        <template #table-columns>
            <el-table-column
                prop="name"
                :label="$t('asset.list.fields.name')"
                width="180"
            />
            <el-table-column
                prop="assetType"
                :label="$t('asset.list.fields.assetType')"
                width="150"
            >
                <template #default="scope">
                    <span>{{
                        $t(`asset.list.fieldsValues.assetType.${scope.row.type}`)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('asset.list.fields.assetCategory')" width="180">
                <template #default="scope">
                    <span>{{ getAssetCategory(scope.row.category) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="assignee.fullName"
                :label="$t('asset.list.fields.createdBy')"
                width="180"
            />
            <el-table-column
                prop="description"
                :label="$t('asset.list.fields.description')"
                width="180"
            />
            <el-table-column
                prop="requestQuantity"
                :label="$t('asset.list.fields.requestQuantity')"
                width="170"
                align="center"
            />
            <el-table-column
                prop="approveQuantity"
                :label="$t('asset.list.fields.approveQuantity')"
                width="200"
                align="center"
            />
            <el-table-column
                prop="price"
                :label="$t('asset.list.fields.price')"
                min-width="180"
            >
                <template #default="scope">
                    <span>
                        {{ parseMoney(scope.row.price) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                :label="$t('asset.list.fields.status')"
                align="center"
            >
                <template #default="scope">
                    <el-dropdown v-if="isCanUpdateStatus(scope.row)">
                        <div
                            :class="`badge status-field badge-md bg-${statusBadge(
                                scope.row.status,
                            )}`"
                        >
                            <span>{{
                                $t(`asset.list.fieldsValues.status.${scope.row.status}`)
                            }}</span>
                            <ArrowDownBoldIcon class="action-icon arrow-down" />
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    @click="openApprovePopup(scope.row)"
                                    type="primary"
                                    size="mini"
                                >
                                    {{ $t('asset.list.fieldsValues.status.approved') }}
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="onClickButtonReject(scope.row)"
                                    type="warning"
                                    size="mini"
                                >
                                    {{ $t('asset.list.fieldsValues.status.rejected') }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <div
                        v-else
                        :class="`badge status-field badge-md bg-${statusBadge(
                            scope.row.status,
                        )}`"
                    >
                        {{ $t(`asset.list.fieldsValues.status.${scope.row.status}`) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                :label="$t('asset.list.fields.actions')"
                width="150"
                align="center"
            >
                <template #default="scope">
                    <div
                        class="button-group"
                        :class="checkFullPermissionActions() ? 'group-left' : ''"
                    >
                        <el-tooltip
                            effect="dark"
                            :content="$t('asset.list.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate(scope.row)"
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
                            :content="$t('asset.list.tooltip.add')"
                            placement="top"
                            v-else-if="isCanCreate(scope.row)"
                        >
                            <el-button
                                @click="onClickButtonCreateAsset(scope.row)"
                                type="primary"
                                size="mini"
                            >
                                <GoodsIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('asset.list.tooltip.delete')"
                            placement="top"
                            v-if="isCanDelete(scope.row)"
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
import { mixins, Options } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { assetModule } from '@/modules/asset/store/asset.store';
import { IRequestAsset, IUpdateAsset } from '../../types';
import { ElLoading } from 'element-plus';
import { requestAssetService } from '../../services/request-asset-api.services';
import { RequestAssetStatus } from '../../constants';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Tools as ToolsIcon,
    Goods as GoodsIcon,
    Plus as PlusIcon,
    ArrowDownBold as ArrowDownBoldIcon,
} from '@element-plus/icons-vue';
import {
    CONFIRM_POPUP_RESULT,
    SupportLanguage,
    HttpStatus,
    DEFAULT_FIRST_PAGE,
} from '@/common/constants';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { requestAssetModule } from '../../store/requestAsset.store';
import { appModule } from '@/store/app';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
        ToolsIcon,
        GoodsIcon,
        PlusIcon,
        ArrowDownBoldIcon,
    },
})
export default class RequestAssetTable extends mixins(UtilMixins) {
    get requestAssetList(): IRequestAsset[] {
        return requestAssetModule.requestAssets;
    }

    isCanCreate(requestAsset: IRequestAsset): boolean {
        return (
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.CREATE}`,
            ]) && requestAsset.status === RequestAssetStatus.APPROVED
        );
    }

    isCanDelete(requestAsset: IRequestAsset): boolean {
        return (
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.DELETE}`,
            ]) && requestAsset.status !== RequestAssetStatus.APPROVED
        );
    }

    isCanUpdate(requestAsset: IRequestAsset): boolean {
        return (
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.UPDATE}`,
            ]) && requestAsset.status === RequestAssetStatus.PENDING
        );
    }

    statusBadge(status: RequestAssetStatus): string {
        switch (status) {
            case RequestAssetStatus.APPROVED:
                return 'info';
            case RequestAssetStatus.PENDING:
                return 'secondary';
            case RequestAssetStatus.REJECTED:
                return 'danger';
            case RequestAssetStatus.DONE:
                return 'success';
            default:
                return '';
        }
    }

    async onClickButtonEdit(updateRequestAsset: IRequestAsset): Promise<void> {
        requestAssetModule.setSelectedRequestAsset(updateRequestAsset);
        requestAssetModule.setIsShowRequestAssetFormPopUp(true);
    }

    async onClickButtonCreateAsset(requestAsset: IRequestAsset): Promise<void> {
        assetModule.setSelectedAsset({ requestAssetId: requestAsset.id } as IUpdateAsset);
        assetModule.setIsShowAssetFormPopUp(true);
    }

    getAssetCategory(category: string): string {
        const currentCategory = assetModule.categories.find((cate) => {
            return cate.code === category;
        });
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return currentCategory?.value?.[currentLanguage] || '';
    }

    async handleRejectRequest(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await requestAssetService.updateStatus(
            requestAssetModule.selectedRequestAsset?.id || 0,
            {
                status: RequestAssetStatus.REJECTED,
            },
        );
        loading.close();
        if (response.success) {
            this.showSuccessNotification(
                this.$t('asset.list.confirmApprove.message.rejectSuccess') as string,
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await requestAssetModule.getRequestAssets();
            loading.close();
        } else {
            this.showErrorNotification(response.message);
            const loading = ElLoading.service({
                target: '.content',
            });
            await requestAssetModule.getRequestAssets();
            loading.close();
        }
        requestAssetModule.setSelectedRequestAsset(null);
    }

    async onClickButtonReject(requestAsset: IRequestAsset): Promise<void> {
        const result = await this.showConfirmPopup(
            this.$t(`asset.list.confirmApprove.confirmRejectText`) as string,
            this.$t(`asset.list.confirmApprove.rejectedRequestTitle`) as string,
            {
                confirmButtonText: this.$t(
                    `asset.list.confirmApprove.approveButtonText`,
                ) as string,
                cancelButtonText: this.$t(
                    `asset.list.confirmApprove.cancelButtonText`,
                ) as string,
            },
        );
        if (result === CONFIRM_POPUP_RESULT.CONFIRM) {
            requestAssetModule.setSelectedRequestAsset(requestAsset);
            await this.handleRejectRequest();
        }
    }

    async openApprovePopup(requestAsset: IRequestAsset): Promise<void> {
        requestAssetModule.setSelectedRequestAsset(requestAsset);
        requestAssetModule.setIsShowApprovePopUp(true);
    }

    // event click delete
    async onClickButtonDelete(id: number): Promise<void> {
        const result = await this.showConfirmPopup(
            this.$t('asset.list.confirmDelete.deleteRequestAssetConfirmText') as string,
            this.$t('asset.list.confirmDelete.deleteRequestAssetConfirmTitle') as string,
            {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        );
        if (result) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await requestAssetService.delete(id);
            loading.close();
            if (response.success) {
                this.showSuccessNotification(
                    this.$t('asset.list.confirmDelete.success.messageRequest') as string,
                );
                requestAssetModule.setRequestAssetQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await requestAssetModule.getRequestAssets();
                loading.close();
            } else {
                this.showErrorNotification(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await requestAssetModule.getRequestAssets();
                    loading.close();
                }
            }
        }
    }

    isCanUpdateStatus(requestAsset: IRequestAsset): boolean {
        return (
            requestAsset.status === RequestAssetStatus.PENDING &&
            this.isCanUpdate(requestAsset)
        );
    }

    checkFullPermissionActions(): boolean {
        return (
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.DELETE}`,
            ]) &&
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.CREATE}`,
            ]) &&
            checkUserHasPermission(requestAssetModule.userPermissions, [
                `${PermissionResources.REQUEST_ASSET}_${PermissionActions.UPDATE}`,
            ])
        );
    }
}
</script>

<style lang="scss" scoped>
.status-field {
    font-size: 14px;
}
.drop-btn {
    margin-right: 10px;
}
.action-icon {
    height: 1em;
    width: 1em;
}
.el-dropdown-menu {
    padding: 0px !important;
}
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.group-left {
    justify-content: space-between;
}
:deep(.el-dialog__header) {
    text-align: left !important;
}
.arrow-down {
    margin-left: 5px;
}
.badge-md {
    width: 115px;
}
</style>
