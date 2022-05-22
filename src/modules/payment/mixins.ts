import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-class-component';
import { ASSET_TABS } from './constants';

export class AssetMixins extends mixins(UtilMixins) {
    ASSET_TABS = ASSET_TABS;
}
