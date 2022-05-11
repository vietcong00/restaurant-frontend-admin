import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { HttpStatus, PageName } from '@common/constants';
import { IMemberInfo, ITeamUpdate } from '../types';
import { TeamSchema } from '../constants';
import router from '@/router';
import { teamService } from '../services/team-api.services';
import { useRoute } from 'vue-router';
import { teamModule } from '../store';
import { USERS_SIZE_PER_PAGE } from '@/modules/user/constants';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';

export const validateTeamSchema = TeamSchema;

export function initData() {
    const { t } = useI18n();
    const route = useRoute();
    const initValues = {
        name: '',
        description: '',
        usersInfo: [] as IMemberInfo[],
    };
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateTeamSchema,
    });

    const usersInfo = [] as IMemberInfo[];
    const onSubmit = handleSubmit(async (values) => {
        teamModule.selectedTeamMembers.forEach((member) => {
            const userInfo: IMemberInfo = {
                userId: member.userId,
                userRole: member.userRole,
                order: member.order,
            };
            usersInfo.push(userInfo);
        });
        const index = usersInfo.findIndex(
            (member: { userRole?: string }) => member.userRole === '',
        );
        if (index === -1) {
            const updateInfo = {
                name: values.name?.trim(),
                description: values.description?.trim(),
                usersInfo: usersInfo,
            } as unknown as ITeamUpdate;
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await teamService.update(
                parseInt(route.params?.id as string),
                updateInfo,
            );
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    t('team.list.message.update.success') as string,
                );
                teamModule.setTeamQueryString({ limit: USERS_SIZE_PER_PAGE });
                teamModule.clearQueryString();
                loading.close();
                router.push({
                    name: PageName.TEAM_PAGE,
                });
            } else {
                showErrorNotificationFunction(response.message as string);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    router.push({
                        name: PageName.TEAM_PAGE,
                    });
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await teamModule.getTeams();
                    loading.close();
                }
            }
        }
    });
    const { value: name } = useField('name');
    const { value: description } = useField('description');
    return {
        name,
        description,
        errors,
        usersInfo,

        validate,
        onSubmit,
        resetForm,
    };
}
