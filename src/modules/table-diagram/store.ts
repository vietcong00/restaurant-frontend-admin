import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import { tableService } from './services/api.service';
import { ITable, IPatchQueryTable, IQueryStringTable } from './types';
import {
    DEFAULT_FIRST_PAGE,
    LIMIT_PER_PAGE,
    DEFAULT_ORDER_DIRECTION,
} from '@/common/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';
import { DEFAULT_ORDER_BY } from '../user/constants';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: null,
    idRestaurant: null,
};

@Module({ dynamic: true, namespaced: true, store, name: 'table-diagram' })
class TableDiagramModule extends VuexModule {
    tableList: Array<ITable> = [];
    tableSelected = -1;
    numberPeople = -1;

    isShowModalChosenTable = false;
    isShowModalTableDetail = false;
    idBookingSelected = -1;
    arrivalTimeSelected = -1;
    numberSeatSelected = 0;
    canChosenTable = false;

    tableQueryString: IQueryStringTable = initQueryString;

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
    MUTATE_TABLES_RESTAURANTS(data: Array<ITable>) {
        this.tableList = data;
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
    MUTATE_EVENT_QUERY_STRING(query: IQueryStringTable) {
        this.tableQueryString = {
            ...this.tableQueryString,
            ...query,
        };
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
    setTableQueryString(query: IQueryStringTable) {
        this.MUTATE_EVENT_QUERY_STRING(query);
    }

    // API Table

    @Action
    async getTables() {
        const response = (await tableService.getList({
            ...this.tableQueryString,
        })) as IBodyResponse<IGetListResponse<ITable>>;
        if (response.success) {
            this.MUTATE_TABLES_RESTAURANTS(response?.data?.items || []);
        } else {
            this.MUTATE_TABLES_RESTAURANTS([]);
        }
        return response;
    }

    @Action
    patchTable(query: IPatchQueryTable) {
        tableService.update(this.tableSelected, query).then((response) => {
            if (response.success) {
                this.getTables();
            }
        });
    }
}

export const tableDiagramModule = getModule(TableDiagramModule);
