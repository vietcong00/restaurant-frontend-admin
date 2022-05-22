<template>
    <BaseTableLayout :data="foodBillingTable">
        <template #table-columns>
            <el-table-column
                prop="food.name"
                :label="$t('billing.form.foodBillingTable.food')"
            />
            <el-table-column
                prop="food.price"
                width="170"
                :label="$t('billing.form.foodBillingTable.price')"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.food.price) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                width="200"
                :label="$t('billing.form.foodBillingTable.quantity')"
            />
            <el-table-column
                prop="total"
                width="200"
                :label="$t('billing.form.foodBillingTable.total')"
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.total) }}
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { Options, setup } from 'vue-class-component';
import { mixins } from 'vue-property-decorator';
import { setupDelete } from '../composition/billingList';
import { IFoodBilling } from '../types';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { UtilMixins } from '@/mixins/utilMixins';
import { billingModule } from '../store';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class BillingTable extends mixins(UtilMixins) {
    deleteAction = setup(() => setupDelete());

    get foodBillingTable(): IFoodBilling[] {
        return billingModule.foodBillingList;
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
