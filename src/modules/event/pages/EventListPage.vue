<template>
    <div class="event-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('event.list.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalEvents"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <EventTable />
        <EventPopup />
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import { Options } from 'vue-class-component';
import EventTable from '../components/EventTable.vue';
import EventPopup from '../components/EventFormPopup.vue';
import { eventModule } from '../store';
import Sort from '../components/Sort.vue';
import { ElLoading } from 'element-plus';
import FilterForm from '../components/FilterForm.vue';
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
@Options({
    components: { EventTable, FilterForm, Sort, EventPopup },
})
export default class EventListPage extends mixins(UtilMixins) {
    isToggleFilterForm = true;

    get totalEvents(): number {
        return eventModule.totalEvents;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(eventModule.userPermissions, [
            `${PermissionResources.EVENT}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return eventModule.eventQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        eventModule.eventQueryString.page = value;
    }

    created(): void {
        eventModule.clearQueryString();
        this.getEventList();
    }

    async getEventList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await eventModule.getEventList();
        loading.close();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async handlePaginate(): Promise<void> {
        eventModule.setEventQueryString({ page: this.selectedPage });
        this.getEventList();
    }

    onClickButtonCreate(): void {
        eventModule.setIsShowEventFormPopUp(true);
    }
}
</script>
