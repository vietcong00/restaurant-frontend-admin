import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class ClosingRevenueApiService extends BaseService {}

export const closingRevenueService = new ClosingRevenueApiService(
    { baseUrl: '/closing-revenue' },
    service,
);
