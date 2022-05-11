<template>
    <BaseTableLayout :data="assetList">
        <template #table-columns>
            <el-table-column
                prop="name"
                :label="$t('asset.list.fields.name')"
                min-width="200"
            />
            <el-table-column :label="$t('asset.list.fields.assetType')" min-width="150">
                <template #default="scope">
                    <span>{{
                        $t(`asset.list.fieldsValues.assetType.${scope.row.type}`)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('asset.list.fields.purchaseDate')"
                min-width="150"
            >
                <template #default="scope">
                    <span>{{ parseDateTime(scope.row.purchaseDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('asset.list.fields.assetCategory')" width="180">
                <template #default="scope">
                    <span>{{ getAssetCategory(scope.row.category) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="description"
                :label="$t('asset.list.fields.description')"
                min-width="180"
            />
            <el-table-column
                prop="code"
                :label="$t('asset.list.fields.code')"
                min-width="170"
            />
            <el-table-column
                prop="usingStatus"
                :label="$t('asset.list.fields.usingStatus')"
                min-width="170"
            >
                <template #default="scope">
                    <span>{{
                        $t(`asset.list.filterForm.usingStatus.${scope.row.usingStatus}`)
                    }}</span>
                </template>
            </el-table-column>
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
                prop="assignee.fullName"
                :label="$t('asset.list.fields.assignee')"
                min-width="170"
            />
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
                            :content="$t('asset.list.tooltip.delete')"
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
import { mixins, Options } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { assetModule } from '@/modules/asset/store/asset.store';
import { IAsset, IUpdateAsset } from '../../types';
import { ElLoading } from 'element-plus';
import { assetService } from '../../services/asset-api.services';
import { DEFAULT_FIRST_PAGE, HttpStatus, SupportLanguage } from '@/common/constants';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { appModule } from '@/store/app';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class RequestAssetTable extends mixins(UtilMixins) {
    get assetList(): IAsset[] {
        return assetModule.assetList;
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(assetModule.userPermissions, [
            `${PermissionResources.ASSET}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(assetModule.userPermissions, [
            `${PermissionResources.ASSET}_${PermissionActions.UPDATE}`,
        ]);
    }

    getAssetCategory(category: string): string {
        const currentCategory = assetModule.categories.find((cate) => {
            return cate.code === category;
        });
        const currentLanguage = appModule.selectedLanguage as SupportLanguage;
        return currentCategory?.value?.[currentLanguage] || '';
    }

    onClickButtonEdit(updateAsset: IUpdateAsset): void {
        assetModule.setSelectedAsset(updateAsset);
        assetModule.setIsShowAssetFormPopUp(true);
    }

    // event click delete
    async onClickButtonDelete(id: number): Promise<void> {
        const isConfirm = await this.showConfirmPopup(
            this.$t('asset.list.confirmDelete.deleteAssetConfirmText') as string,
            this.$t('asset.list.confirmDelete.deleteAssetConfirmTitle') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await assetService.delete(id);
            loading.close();
            if (response.success) {
                this.showSuccessNotification(
                    this.$t('asset.list.confirmDelete.success.message') as string,
                );
                assetModule.setAssetQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await assetModule.getAssets();
                loading.close();
            } else {
                this.showErrorNotification(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await assetModule.getAssets();
                    loading.close();
                }
            }
        }
    }

    checkFullPermissionActions(): boolean {
        return (
            checkUserHasPermission(assetModule.userPermissions, [
                `${PermissionResources.ASSET}_${PermissionActions.DELETE}`,
            ]) &&
            checkUserHasPermission(assetModule.userPermissions, [
                `${PermissionResources.ASSET}_${PermissionActions.UPDATE}`,
            ])
        );
    }
}
</script>

<style lang="scss" scoped>
.status-field {
    font-size: 14px;
    width: 100px;
}
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
</style>
