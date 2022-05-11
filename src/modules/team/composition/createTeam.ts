import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { PageName } from '@common/constants';
import { IMemberInfo, ITeamCreate } from '../types';
import { TeamSchema } from '../constants';
import router from '@/router';
import { teamService } from '../services/team-api.services';
import { teamModule } from '../store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';

export const validateTeamSchema = TeamSchema;

export function initData() {
    const { t } = useI18n();
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
        const index = usersInfo.findIndex(
            (mem: { userRole: string | undefined }) => mem.userRole === '',
        );
        if (index === -1) {
            const createInfo = {
                name: values.name?.trim(),
                description: values.description?.trim() || null,
                usersInfo: usersInfo,
            } as unknown as ITeamCreate;
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await teamService.create(createInfo);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    t('team.list.message.create.success') as string,
                );
                teamModule.clearQueryString();
                router.push({
                    name: PageName.TEAM_PAGE,
                });
            } else {
                showErrorNotificationFunction(response.message as string);
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
