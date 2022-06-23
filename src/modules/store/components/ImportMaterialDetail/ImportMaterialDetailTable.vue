<template>
    <BaseTableLayout :data="importDetailList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.id')
                "
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.nameMaterial',
                    )
                "
                sortable="custom"
                width="200"
            >
                <template #default="scope">
                    {{ scope.row?.material?.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.unit')
                "
            >
                <template #default="scope">
                    {{ scope.row?.material?.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importPrice"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.pricePerUnit',
                    )
                "
                sortable="custom"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.pricePerUnit) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.quantity',
                    )
                "
            >
                <template #default="scope">
                    {{ scope.row.quantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.note')
                "
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                width="200"
                fixed="right"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.status',
                    )
                "
            >
                <template #default="scope">
                    <MenuAcceptStatus
                        :status="scope.row.status"
                        :id="scope.row.id"
                        @set-status="setStatus"
                    />
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IImportMaterialDetail } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { storeModule } from '../../store';
import { importMaterialDetailService } from '../../services/api.service';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';

@Options({
    name: 'import-material-detail-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class ImportMaterialDetailTable extends mixins(StoreMixins) {
    get importDetailList(): IImportMaterialDetail[] {
        return storeModule.importMaterialDetailList;
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await importMaterialDetailService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.importMaterialDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getImportMaterialOrders();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterialOrders();
                loading.close();
            }
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

.action-icon {
    height: 1em;
    width: 1em;
}
</style>
