import { bookingService } from './../table-diagram/services/api.service';
import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import { IBooking, IQueryStringBooking, IBookingUpdate } from './types';
import {
    DEFAULT_FIRST_PAGE,
    LIMIT_PER_PAGE,
    DEFAULT_ORDER_DIRECTION,
} from '@/common/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';
import { DEFAULT_ORDER_BY } from '../user/constants';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: null,
};

@Module({ dynamic: true, namespaced: true, store, name: 'booking' })
class BookingModule extends VuexModule {
    bookingList: Array<IBooking> = [];
    totalBookings = 0;

    selectedBooking: IBookingUpdate | null = null;

    tableSelected = -1;
    numberPeople = -1;

    isShowModalChosenTable = false;
    isShowModalTableDetail = false;
    idBookingSelected = -1;
    arrivalTimeSelected = -1;
    numberSeatSelected = 0;
    canChosenTable = false;

    bookingQueryString: IQueryStringBooking = initQueryString;

    isShowBookingFormPopUp = false;
    isDisabledSaveButton = false;

    get checkCanChosenTable() {
        return this.canChosenTable;
    }

    get getNumberSeatSelected() {
        return this.numberSeatSelected;
    }

    get getTableSelected() {
        return this.tableSelected;
    }

    get getNumberPeople() {
        return this.numberPeople;
    }

    get checkShowModalChosenTable() {
        return this.isShowModalChosenTable;
    }

    get checkShowModalTableDetail() {
        return this.isShowModalTableDetail;
    }

    get getArrivalTimeSelected() {
        return this.arrivalTimeSelected;
    }

    // GETTERS
    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.EVENT);
    }

    @Mutation
    MUTATE_BOOKING_LIST(data: Array<IBooking>) {
        this.bookingList = data;
    }

    @Mutation
    MUTATE_TOTAL_BOOKINGS(totalBookings: number) {
        this.totalBookings = totalBookings;
    }

    @Mutation
    SET_CAN_CHOSEN_TABLE(data: boolean) {
        this.canChosenTable = data;
    }

    @Mutation
    SET_NUMBER_SEAT_SELECTED(data: number) {
        this.numberSeatSelected = data;
    }

    @Mutation
    SET_ARRIVAL_TIME_SELECTED(data: number) {
        this.arrivalTimeSelected = data;
    }

    @Mutation
    SET_SELECTED_TABLE(data: number) {
        this.tableSelected = data;
    }

    @Mutation
    SET_NUMBER_PEOPLE(data: number) {
        this.numberPeople = data;
    }

    @Mutation
    UPDATE_CHECK_SHOW_MODAL_CHOSEN_TABLE(data: boolean) {
        this.isShowModalChosenTable = data;
    }

    @Mutation
    UPDATE_CHECK_SHOW_MODAL_TABLE_DETAIL(data: boolean) {
        this.isShowModalTableDetail = data;
    }

    @Mutation
    MUTATE_EVENT_QUERY_STRING(query: IQueryStringBooking) {
        this.bookingQueryString = {
            ...this.bookingQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_IS_SHOW_BOOKING_FORM_POP_UP(value: boolean) {
        this.isShowBookingFormPopUp = value;
    }

    @Mutation
    MUTATE_SELECTED_BOOKING(booking: IBookingUpdate | null) {
        this.selectedBooking = booking;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    // ACTION

    @Action
    setTableSelected(data: number) {
        this.SET_SELECTED_TABLE(data);
    }

    @Action
    setNumberPeople(data: number) {
        this.SET_NUMBER_PEOPLE(data);
    }

    @Action
    updateCheckShowModalChosenTable(data: boolean) {
        this.SET_SELECTED_TABLE(-1);
        this.UPDATE_CHECK_SHOW_MODAL_CHOSEN_TABLE(data);
    }

    @Action
    updateCheckShowModalTableDetail(data: boolean) {
        this.UPDATE_CHECK_SHOW_MODAL_TABLE_DETAIL(data);
    }

    @Action
    setArrivalTimeSelected(data: number) {
        this.SET_ARRIVAL_TIME_SELECTED(data);
    }

    @Action
    setNumberSeatSelected(data: number) {
        this.SET_NUMBER_SEAT_SELECTED(data);
    }

    @Action
    setCanChosenTable(data: boolean) {
        this.SET_CAN_CHOSEN_TABLE(data);
    }

    @Action
    clearQueryString() {
        this.MUTATE_EVENT_QUERY_STRING(initQueryString);
    }

    @Action
    setBookingQueryString(query: IQueryStringBooking) {
        this.MUTATE_EVENT_QUERY_STRING(query);
    }

    @Action
    setIsShowBookingFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_BOOKING_FORM_POP_UP(value);
    }

    @Action
    setSelectedBooking(booking: IBookingUpdate | null) {
        this.MUTATE_SELECTED_BOOKING(booking);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    // API Table
    @Action
    async getBookings() {
        const response = (await bookingService.getList({
            ...this.bookingQueryString,
        })) as IBodyResponse<IGetListResponse<IBooking>>;
        if (response.success) {
            this.MUTATE_BOOKING_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_BOOKINGS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_BOOKING_LIST([]);
            this.MUTATE_TOTAL_BOOKINGS(0);
        }
        return response;
    }
}

export const bookingModule = getModule(BookingModule);
