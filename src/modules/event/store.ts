import { Module, Action, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IEvent, IEventUpdate, IQueryStringEvent } from './types';
import { eventService } from './services/api.service';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    LIMIT_PER_PAGE,
} from '@/common/constants';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import { IBodyResponse, IGetListResponse } from '@/common/types';

const initQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: null,
    status: null,
    startDate: null,
};

@Module({ dynamic: true, namespaced: true, store, name: 'event' })
class EventModule extends VuexModule {
    eventList: IEvent[] = [];
    totalEvents = 0;
    eventQueryString: IQueryStringEvent = initQueryString;

    selectedEvent: IEventUpdate | null = null;
    isShowEventFormPopUp = false;
    isDisabledSaveButton = false;

    // GETTERS
    get userPermissions(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.EVENT);
    }

    // ACTIONS
    @Action
    async getEventList() {
        const response = (await eventService.getList({
            ...this.eventQueryString,
        })) as IBodyResponse<IGetListResponse<IEvent>>;
        if (response.success) {
            this.MUTATE_EVENT_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_EVENTS(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_EVENT_LIST([]);
            this.MUTATE_TOTAL_EVENTS(0);
        }
        return response;
    }

    @Action
    clearQueryString() {
        this.MUTATE_EVENT_QUERY_STRING(initQueryString);
    }

    @Action
    setEventQueryString(query: IQueryStringEvent) {
        this.MUTATE_EVENT_QUERY_STRING(query);
    }

    @Action
    setSelectedEvent(event: IEventUpdate | null) {
        this.MUTATE_SELECTED_EVENT(event);
    }

    @Action
    setIsShowEventFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_EVENT_FORM_POP_UP(value);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    // MUTATIONS
    @Mutation
    MUTATE_EVENT_LIST(events: IEvent[]) {
        this.eventList = events;
    }

    @Mutation
    MUTATE_TOTAL_EVENTS(totalEvents: number) {
        this.totalEvents = totalEvents;
    }

    @Mutation
    MUTATE_EVENT_QUERY_STRING(query: IQueryStringEvent) {
        this.eventQueryString = {
            ...this.eventQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_SELECTED_EVENT(event: IEventUpdate | null) {
        this.selectedEvent = event;
    }

    @Mutation
    MUTATE_IS_SHOW_EVENT_FORM_POP_UP(value: boolean) {
        this.isShowEventFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }
}

export const eventModule = getModule(EventModule);
