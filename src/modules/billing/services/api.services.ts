import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class BillingApiService extends BaseService {}

export const billingService = new BillingApiService({ baseUrl: '/billing' }, service);
