import { IBodyResponse, IBulkImportResponse } from '@/common/types';
import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import { IImportAssets } from '../types';

class AssetApiService extends BaseService {
    importAsset(data: IImportAssets): Promise<IBodyResponse<IBulkImportResponse>> {
        return this.client.post(`${this.detailUrl}/bulk-create`, data);
    }
}
export const assetService = new AssetApiService({ baseUrl: '/asset' }, service);
