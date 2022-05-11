<template>
    <div class="team-widget" @click="editTeam(team.id)">
        <div class="profile-img">
            <h3 class="team-name text-ellipsis">
                {{ team.name }}
            </h3>
            <h3 class="total-members">
                {{ team.totalMembers + ' ' + $t('team.list.filterForm.employees') }}
            </h3>
        </div>
        <div class="team-action">
            <el-tooltip
                effect="dark"
                :content="$t('asset.list.tooltip.delete')"
                placement="left"
            >
                <el-button
                    type="danger"
                    @click="removeTeam"
                    circle
                    @click.stop="stopTheEvent"
                >
                    <DeleteIcon class="action-icon" />
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { mixins } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { ITeam } from '../types';
import { Options } from 'vue-class-component';
import { teamModule } from '../store';
import router from '@/router';
import { PageName, DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { teamService } from '../services/team-api.services';

import { ElLoading } from 'element-plus';
import i18n from '../../../plugins/vue-i18n';
import { Delete as DeleteIcon } from '@element-plus/icons-vue';
import { PermissionActions, PermissionResources } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        DeleteIcon,
    },
    props: {
        team: {
            type: Object as () => ITeam,
            default: () => ({}),
        },
    },
})
export default class TeamCard extends mixins(UtilMixins) {
    team!: ITeam;

    get isCanUpdate(): boolean {
        return checkUserHasPermission(teamModule.userPermissions, [
            `${PermissionResources.TEAM}_${PermissionActions.UPDATE}`,
        ]);
    }

    get isCanRemove(): boolean {
        return checkUserHasPermission(teamModule.userPermissions, [
            `${PermissionResources.TEAM}_${PermissionActions.DELETE}`,
        ]);
    }

    editTeam(teamId: number): void {
        router.push({
            name: PageName.UPDATE_TEAM_PAGE,
            params: {
                id: teamId,
            },
        });
    }

    async removeTeam(): Promise<void> {
        const isConfirm = await this.showConfirmPopup(
            i18n.global.t('team.list.message.delete.confirmAsk') as string,
            i18n.global.t('common.app.notification') as string,
            {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await teamService.delete(this.team.id);
            loading.close();
            if (response.success) {
                this.showSuccessNotification(
                    i18n.global.t('team.list.message.delete.success') as string,
                );
                teamModule.setTeamQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await teamModule.getTeams();
                loading.close();
            } else {
                this.showErrorNotification(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await teamModule.getTeams();
                    loading.close();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
}
.action-icon {
    height: 1em;
    width: 1em;
}
.team-widget {
    text-align: left;
    height: 100%;
    position: relative;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 15px;
    transition: all 0.3s;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 $--color-primary;
        border-color: $--color-primary;
    }
    .icon-more-user {
        font-size: 25px;
        transform: rotate(90deg);
    }
    .team-action {
        position: absolute;
        right: 15px;
        top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            width: 24px;
            height: 24px;
            min-height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .team-name {
        font-size: 16px;
        color: #212121;
        margin-top: 22px;
    }

    .total-members {
        font-size: 14px;
        color: $--color-primary !important;
        &:not(:last-child) {
            margin-bottom: 2px;
        }
    }
}

.box-popper-menu {
    .box-menu {
        font-size: 13px;
        cursor: pointer;
        margin: 0 -13px;
        div {
            padding: 8px 13px;
            transition: all 0.2s;
            &:hover {
                background-color: #eceffc;
            }
        }
    }
}
</style>
