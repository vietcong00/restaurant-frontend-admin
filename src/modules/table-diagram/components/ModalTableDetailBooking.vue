<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header-label"> Danh sách đặt bàn</slot>
                        <div class="close-icon" @click="closeModal">
                            <CloseBoldIcon style="height: 20px; width: 25px" />
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <el-scrollbar height="350px">
                                <div class="booking-table-data">
                                    <el-table
                                        :data="getBookingTableDetailList"
                                        border
                                        @sort-change="handleSort"
                                        empty-text
                                    >
                                        <el-table-column
                                            align="center"
                                            label="#"
                                            type="index"
                                            width="50"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="Tên khách hàng"
                                            width="160"
                                            class="test"
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
                                            label="Điện thoại"
                                            width="120"
                                            class="test"
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
                                            label="Thời gian tới"
                                            width="250"
                                            sortable="custom"
                                        >
                                            <template #default="scope">
                                                <div class="booking__table__arrival_time">
                                                    {{
                                                        scope.row.arrivalTime
                                                            ? parseDateTime(
                                                                  scope.row.arrivalTime,
                                                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                                                              )
                                                            : ''
                                                    }}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="idCategory"
                                            label="Trạng thái"
                                            width="140"
                                        >
                                            <template #default="scope">
                                                <div class="booking__table__status">
                                                    {{ scope.row.status }}
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-scrollbar>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <el-button
                                type="info"
                                plain
                                class="modal-button"
                                @click="sendData('ready')"
                                ><div class="text-btn">Đã sử dụng xong</div></el-button
                            >
                            <el-button
                                type="danger"
                                plain
                                class="modal-button"
                                @click="sendData('used')"
                                ><div class="text-btn">Bắt đầu sử dụng</div></el-button
                            >
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { tableDiagramModule } from '../store';
import { CloseBold as CloseBoldIcon } from '@element-plus/icons-vue';
import { tableService } from '../services/api.service';
import { HttpStatus } from '@/common/constants';
import {
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IBooking } from '@/modules/booking/types';
import { bookingModule } from '@/modules/booking/store';
import { ITable } from '../types';
@Options({
    name: 'modal-table-detail-booking',
    components: { CloseBoldIcon },
})
export default class ModalTableDetailBooking extends Vue {
    get getBookingTableDetailList(): IBooking[] {
        return bookingModule.bookingTableDetailList;
    }

    closeModal(): void {
        tableDiagramModule.updateCheckShowModalTableDetail(false);
    }

    async sendData(status: string): Promise<void> {
        this.closeModal();

        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await tableService.update(
            tableDiagramModule.tableSelected?.id as number,
            {
                status: status,
            },
        );
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction('Thay đổi trạng thái bàn thành công');
            await tableDiagramModule.getTables();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await tableDiagramModule.getTables();
                loading.close();
            }
        }
    }

    checkTableNull(table: ITable): string {
        if (table === null) {
            return 'Chưa chọn bàn';
        }
        return table.name;
    }

    formatDate(date: Date): string {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return month + '/' + day + '/' + year;
    }

    formatTime(date: Date): string {
        var hours = date.getHours().toString();
        var minutes = date.getMinutes().toString();
        var seconds = date.getSeconds().toString();
        return hours + ':' + minutes + ':' + seconds;
    }

    getTime(timeStamp: number): string {
        var date = new Date(timeStamp * 1000);
        var dt = this.formatTime(date) + ' ' + this.formatDate(date);
        return dt;
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 1110px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-header {
    font-size: 24px;
    font-weight: 600;
    .close-icon {
        position: relative;
        right: -54px;
        top: -54px;
        display: flex;
        align-items: center;
        height: 27px;
        padding-bottom: 3px;
        background-color: #fff;
        border: 1px solid rgb(233, 230, 230);
        border-radius: 50%;
        &:hover {
            color: #fff;
            background-color: red;
            border: 2px solid rgb(158, 156, 156);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            cursor: pointer;
        }
    }
}

.modal-footer {
    display: flex;
    justify-content: space-evenly;
    .text-btn {
        font-weight: 600;
    }
    .modal-button:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}

.booking-table-data {
    width: 1002px;
    margin: 10px auto;
    .booking__table__action {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 18%;
        :hover {
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            cursor: pointer;
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
