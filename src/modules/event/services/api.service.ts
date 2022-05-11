import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import { IBodyResponse } from '@common/types';
import { AxiosPromise } from 'axios';

class EventApiService extends BaseService {
    updateStatus<P, R extends IBodyResponse>(id: number, data: P): AxiosPromise {
        data = this.beforeUpdate<P>(data);
        return this.client.patch<R>(`${this.detailUrl}/${id}/status`, data);
    }
}

export const eventService = new EventApiService({ baseUrl: '/event' }, service);
