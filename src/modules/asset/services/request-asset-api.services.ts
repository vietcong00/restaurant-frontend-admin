import { IBodyResponse } from '@/common/types';
import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class RequestAssetApiService extends BaseService {
    updateStatus<P>(id: number, data: P): Promise<IBodyResponse> {
        data = this.beforeUpdate<P>(data);
        return this.client.patch(`${this.detailUrl}/${id}/status`, data);
    }
}
export const requestAssetService = new RequestAssetApiService(
    { baseUrl: '/request-asset' },
    service,
);
