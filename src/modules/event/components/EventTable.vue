<template>
    <BaseTableLayout :data="eventList">
        <template #table-columns>
            <el-table-column
                prop="title"
                min-width="150"
                :label="$t('event.list.eventTable.header.title')"
            />
            <el-table-column
                prop="startDate"
                align="center"
                min-width="180"
                :label="$t('event.list.eventTable.header.startDate')"
            >
                <template #default="scope">{{
                    parseDateTime(scope.row.startDate)
                }}</template>
            </el-table-column>
            <el-table-column
                prop="endDate"
                align="center"
                min-width="190"
                :label="$t('event.list.eventTable.header.endDate')"
            >
                <template #default="scope">{{
                    parseDateTime(scope.row.endDate)
                }}</template>
            </el-table-column>
            <el-table-column
                prop="userQuantity"
                min-width="200"
                align="center"
                :label="$t('event.list.eventTable.header.quantity')"
            />
            <el-table-column
                prop="budget"
                align="center"
                min-width="150"
                :label="$t('event.list.eventTable.header.budget')"
            >
                <template #default="scope">
                    <span>
                        {{ parseMoney(scope.row.budget) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('event.list.eventTable.header.linkImage')"
                width="200"
            >
                <template #default="scope">
                    <a
                        class="click-here"
                        target="_blank"
                        rel="noopener noreferrer"
                        :href="scope.row.imageUrl"
                        ><u>{{ $t('event.list.eventTable.content.linkImage') }}</u></a
                    >
                </template>
            </el-table-column>
            <el-table-column
                prop="description"
                align="center"
                min-width="250"
                :label="$t('event.list.eventTable.header.description')"
            >
                <template #default="scope">
                    <span>
                        {{ scope.row.description }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                :label="$t('event.list.eventTable.header.status')"
                width="200"
                align="center"
            >
                <template #default="scope">
                    <span
                        size="medium"
                        :class="`badge status-field badge-md bg-${statusBadge(
                            scope.row.status,
                        )}`"
                    >
                        {{ $t(`event.list.status.${scope.row?.status}`) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('event.list.eventTable.header.actions')"
                fixed="right"
                width="150"
                align="center"
            >
                <template #default="scope">
                    <div
                        class="button-group"
                        :class="checkFullPermissionActions() ? 'group-left' : ''"
                    >
                        <el-tooltip
                            effect="dark"
                            :content="$t('event.list.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickButtonEdit(scope.row)"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('event.list.tooltip.delete')"
                            placement="top"
                            v-if="isCanDelete(scope.row?.status)"
                        >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="onClickButtonDelete(scope.row?.id)"
                            >
                                <DeleteIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { IEvent, IEventUpdate } from '../types';
import { eventModule } from '../store';
import { EventStatus } from '../constants';
import { BadgeStatuses } from '@/common/constants';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { setup } from 'vue-class-component';
import { setupDelete } from '@/modules/event/composition/eventList';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class EventTable extends mixins(UtilMixins) {
    deleteAction = setup(() => setupDelete());
    get eventList(): IEvent[] {
        return eventModule.eventList || [];
    }

    isCanDelete(status: EventStatus): boolean {
        return (
            checkUserHasPermission(eventModule.userPermissions, [
                `${PermissionResources.EVENT}_${PermissionActions.DELETE}`,
            ]) && status !== EventStatus.INPROGRESS
        );
    }

    isCanUpdate(status: EventStatus): boolean {
        return (
            checkUserHasPermission(eventModule.userPermissions, [
                `${PermissionResources.EVENT}_${PermissionActions.UPDATE}`,
            ]) && status !== EventStatus.EXPIRED
        );
    }

    statusBadge(status: EventStatus): string {
        switch (status) {
            case EventStatus.INCOMING:
                return BadgeStatuses.SUCCESS;
            case EventStatus.INPROGRESS:
                return BadgeStatuses.WARNING;
            case EventStatus.EXPIRED:
                return BadgeStatuses.DANGER;
            default:
                return '';
        }
    }

    async onClickButtonEdit(updateEvent: IEventUpdate): Promise<void> {
        eventModule.setSelectedEvent(updateEvent);
        eventModule.setIsShowEventFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteEvent(id);
    }

    checkFullPermissionActions(): boolean {
        return (
            checkUserHasPermission(eventModule.userPermissions, [
                `${PermissionResources.EVENT}_${PermissionActions.DELETE}`,
            ]) &&
            checkUserHasPermission(eventModule.userPermissions, [
                `${PermissionResources.EVENT}_${PermissionActions.UPDATE}`,
            ])
        );
    }
}
</script>

<style lang="scss" scoped>
.status-field {
    font-size: 14px;
    width: 100px;
}
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
}
.group-left {
    justify-content: space-between;
}
.badge {
    font-size: 14px;
    color: #fff;
    width: 70%;
}
.action-icon {
    height: 1em;
    width: 1em;
}
</style>
