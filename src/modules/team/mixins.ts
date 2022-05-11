import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-class-component';
import { MIN_MEMBER_ORDER, TEAM_SIZE_PER_PAGE } from './constants';

export class TeamMixins extends mixins(UtilMixins) {
    minOrder = MIN_MEMBER_ORDER;
    pageLimit = TEAM_SIZE_PER_PAGE;
}
