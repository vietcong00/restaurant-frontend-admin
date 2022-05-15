<template>
    <BaseTableLayout :data="bookingList" class="booking-table-data">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('booking.list.bookingTable.header.id')"
                type="index"
                :index="indexMethod"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('booking.list.bookingTable.header.nameCustomer')"
                width="200"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__name">
                        {{ scope.row.nameCustomer }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('booking.list.bookingTable.header.phone')"
                width="170"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__phone">
                        {{ scope.row.phone }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="arrivalTime"
                :label="$t('booking.list.bookingTable.header.arrivalTime')"
                width="250"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__arrival_time">
                        {{ parseDateTimeTime(scope.row.arrivalTime) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.numberPeople')"
                width="200"
            >
                <template #default="scope">
                    <div class="booking__table__name_table">
                        {{ scope.row.numberPeople }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.table')"
                width="150"
            >
                <template #default="scope">
                    <div class="booking__table__name_table">
                        {{ scope.row.tablesRestaurant?.name || '' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.status')"
                width="150"
            >
                <template #default="scope">
                    <div class="booking__table__status" :class="scope.row.status">
                        {{ scope.row.status }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('booking.list.bookingTable.header.actions')"
                width="150"
                fixed="right"
            >
                <template #default="scope">
                    <div class="booking__table__action">
                        <div class="booking-done">
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="green"
                                title="Bạn có chắc chắn hoàn thành yêu cầu đặt bàn này?"
                                @confirm="changeStatus(scope.row.id, 'Done')"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'check-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div class="booking-canceled">
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                title="Bạn có muốn hủy yêu cầu đặt bàn này không?"
                                @confirm="changeStatus(scope.row.id, 'Canceled')"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'x-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div
                            class="booking-change-table"
                            @click="
                                openModal(
                                    scope.row.id,
                                    scope.row.arrivalTime,
                                    scope.row.numberPeople,
                                )
                            "
                        >
                            <comp-icon :iconName="'dinning-table-small-icon'" />
                        </div>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IBooking } from '../types';
import CompIcon from '../../../components/CompIcon.vue';
import { storeModule } from '../store';
import { StoreMixins } from '../mixins';

@Options({
    name: 'booking-table-component',
    components: {
        CompIcon,
    },
})
export default class BookingTable extends mixins(StoreMixins) {
    get bookingList(): IBooking[] {
        return storeModule.bookingList;
    }

    created(): void {
        storeModule.getBookings();
    }
}
</script>

<style lang="scss" scoped>
.header-options-table {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .input-search-booking {
        width: 200px;
    }
    .pagination-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .page-size-dropdown {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: fit-content;
            padding: 8px 10px 8px 22px;
            border: 2px solid #d0d0d0;
            .text-dropdown {
                color: #8c8c8c;
                margin-right: 10px;
            }
        }
    }
}
.booking-table-data {
    .booking__table__action {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        margin: 0 18%;
        :hover {
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            cursor: pointer;
        }

        .booking-change-table:hover {
            width: 50px;
            border: 2px solid rgb(21, 239, 255);
        }

        .booking-done:hover {
            color: green;
            border: 2px solid rgb(3, 180, 3);
        }

        .booking-canceled:hover {
            color: red;
            border: 2px solid rgb(235, 0, 0);
        }
    }
}
</style>
