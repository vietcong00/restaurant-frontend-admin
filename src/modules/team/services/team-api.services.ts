import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class TeamApiService extends BaseService {}
export const teamService = new TeamApiService({ baseUrl: '/team' }, service);
