<template>
    <div class="table-item" :class="table.id === tableSelected?.id ? 'selected' : ''">
        <div :class="table.status">
            <div
                class="table-layout"
                @click="selectTable"
                :class="
                    table.numberSeat < selectedBooking?.numberPeople ? 'not-enough' : ''
                "
            >
                <img
                    class="table-img"
                    :src="
                        require(`../../../assets/images/table/table-${getImgLink(
                            table?.numberSeat,
                        )}.png`)
                    "
                    alt=""
                />
                <div class="table-name">{{ table.name }}</div>
            </div>
            <ModalTableDetailBooking v-if="isShowModalTableDetail" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { tableDiagramModule } from '../store';
import ModalTableDetailBooking from './ModalTableDetailBooking.vue';
import { ElLoading, ElMessageBox } from 'element-plus';
import { LIMIT_ARRIVAL_TIME_BOOKING, TableStatus } from '../constants';
import { Prop } from 'vue-property-decorator';
import { bookingModule } from '@/modules/booking/store';
import { ITable } from '../types';
import { IBookingUpdate } from '@/modules/booking/types';

@Options({
    name: 'table',
    components: {
        ModalTableDetailBooking,
    },
})
export default class TablesRestaurants extends Vue {
    @Prop({}) table!: ITable;

    get tableSelected(): ITable | null {
        return tableDiagramModule.tableSelected;
    }

    get isShowModalTableDetail(): boolean {
        return tableDiagramModule.isShowModalTableDetail;
    }

    get isShowModalChosenTable(): boolean {
        return bookingModule.isShowModalChosenTable;
    }

    get isShowBookingFormPopUp(): boolean {
        return bookingModule.isShowBookingFormPopUp;
    }

    get selectedBooking(): IBookingUpdate | null {
        return bookingModule.selectedBooking;
    }

    getImgLink(numberSeat: number): string {
        switch (numberSeat) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 4:
                return 'four';
            case 6:
                return 'six';
            case 8:
                return 'eight';
            case 10:
                return 'ten';
            default:
                return 'one';
        }
    }

    async selectTable(): Promise<void> {
        tableDiagramModule.setTableSelected(this.table);
        const loading = ElLoading.service({
            target: '.table-detail-booking-table-data',
        });
        await bookingModule.getBookingTables();
        loading.close();
        let success = false;
        if (this.isShowModalChosenTable || this.isShowBookingFormPopUp) {
            if (
                this.checkNumberSeat(
                    this.selectedBooking?.numberPeople || 0,
                    this.table.numberSeat,
                )
            ) {
                success = true;
                if (this.table.status === TableStatus.USED) {
                    if (
                        Math.abs(
                            new Date().getTime() -
                                new Date(
                                    this.selectedBooking?.arrivalTime as Date,
                                ).getTime(),
                        ) < LIMIT_ARRIVAL_TIME_BOOKING
                    ) {
                        const textWarning = `Bàn bạn vừa chọn đang được sử dụng. Vui lòng chọn bàn khác!`;
                        ElMessageBox.alert(textWarning, 'Warning', {
                            confirmButtonText: 'OK',
                        });
                        success = false;
                    }
                }
            }
        } else {
            tableDiagramModule.updateCheckShowModalTableDetail(true);
        }
        tableDiagramModule.setCanChosenTable(success);
    }

    checkNumberSeat(numberPeople: number, numberSeat: number): boolean {
        if (numberPeople > numberSeat) {
            const textWarning = `Yêu cầu đặt bàn có ${numberPeople} chỗ. Bàn bạn vừa chọn chỉ có ${numberSeat} chỗ. Vui lòng chọn bàn khác!`;
            ElMessageBox.alert(textWarning, 'Warning', {
                confirmButtonText: 'OK',
            });
            return false;
        }
        return true;
    }
}
</script>

<style lang="scss" scoped>
.table-item {
    width: 15%;
    margin: 30px;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    .table-img {
        width: 50px;
        height: 50px;
    }
    .table-name {
        color: #000000;
        font-weight: 200;
    }
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .table-name {
            font-weight: 700;
        }
    }
    .table-layout {
        padding: 10px;
    }
}

.not-enough {
    padding: 10px;
    background: #e6e6e6;
    border: 1px solid #ffeded;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    opacity: 0.2;
    cursor: none;
}

.selected {
    border: 1px solid #ff0000;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.booked {
    background: #ebff78;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.used {
    background: #9eb3fa;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
