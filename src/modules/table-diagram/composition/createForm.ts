import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@common/constants';
import { IEvent, IEventCreate } from '../types';
import { EventSchema } from '../constants';
import moment from 'moment';
import { eventService } from '../services/api.service';
import { tableDiagramModule } from '../store';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IBodyResponse } from '@/common/types';

export const validateEventSchema = EventSchema;

export function initData() {
    const { t } = useI18n();
    const initValues = {
        title: '',
        description: '',
        imageUrl: '',
        startDate: undefined,
        endDate: undefined,
        userQuantity: undefined,
        budget: undefined,
    };
    // const isCreate = computed(() => !tableDiagramModule.selectedEvent?.id);
    // const { handleSubmit, errors, resetForm, validate } = useForm({
    //     initialValues: initValues,
    //     validationSchema: validateEventSchema,
    // });

    // const onSubmit = handleSubmit(async (values) => {
    //     const createBody = {
    //         ...values,
    //         title: values.title?.trim(),
    //         budget: values.budget || null,
    //         description: values.description || '',
    //         imageUrl: values.imageUrl?.trim(),
    //         userQuantity: values.userQuantity || null,
    //         startDate: moment(values.startDate).utc().fmFullTimeString(),
    //         endDate: moment(values.endDate).endOfDay().utc().fmFullTimeString(),
    //     } as IEventCreate;
    //     let response;
    //     const eventId = tableDiagramModule.selectedEvent?.id;
    //     const loading = ElLoading.service({
    //         target: '.event-form-popup',
    //     });
    //     if (!isCreate.value) {
    //         response = await eventService.update(eventId as number, createBody);
    //     } else {
    //         response = await eventService.create(createBody);
    //     }
    //     loading.close();
    //     if (response.success) {
    //         showSuccessNotificationFunction(
    //             !isCreate.value
    //                 ? t('event.list.message.update.success')
    //                 : (t('event.list.message.create.success') as string),
    //         );
    //         tableDiagramModule.setEventQueryString({
    //             page: DEFAULT_FIRST_PAGE,
    //         });
    //         const loading = ElLoading.service({
    //             target: '.content',
    //         });
    //         await tableDiagramModule.getEventList();
    //         loading.close();
    //         await tableDiagramModule.setIsShowEventFormPopUp(false);
    //     } else {
    //         showErrorNotificationFunction(response.message as string);
    //         if (response.code === HttpStatus.ITEM_NOT_FOUND) {
    //             tableDiagramModule.setIsShowEventFormPopUp(false);
    //             const loading = ElLoading.service({
    //                 target: '.content',
    //             });
    //             await tableDiagramModule.getEventList();
    //             loading.close();
    //         }
    //     }
    // });
    const { value: title } = useField('title');
    const { value: description } = useField('description');
    const { value: imageUrl } = useField('imageUrl');
    const { value: startDate } = useField('startDate');
    const { value: endDate } = useField('endDate');
    const { value: userQuantity } = useField('userQuantity');
    const { value: budget } = useField('budget');
    // const openPopup = async () => {
    //     if (!isCreate.value) {
    //         const loading = ElLoading.service({
    //             target: '.event-form-popup',
    //         });
    //         const eventDetail = (await eventService.getDetail(
    //             tableDiagramModule.selectedEvent?.id || 0,
    //         )) as IBodyResponse<IEvent>;
    //         loading.close();
    //         resetForm({
    //             values: {
    //                 title: eventDetail.data?.title,
    //                 description: eventDetail.data?.description,
    //                 imageUrl: eventDetail.data?.imageUrl as string,
    //                 startDate: moment(eventDetail.data?.startDate).fmDayString(),
    //                 endDate: moment(eventDetail.data?.endDate).fmDayString(),
    //                 userQuantity: eventDetail.data?.userQuantity,
    //                 budget: eventDetail.data?.budget,
    //             },
    //         });
    //     } else {
    //         resetForm({
    //             values: initValues,
    //         });
    //     }
    // };
    return {
        title,
        description,
        imageUrl,
        startDate,
        endDate,
        userQuantity,
        budget,
        // errors,

        // validate,
        // openPopup,
        // onSubmit,
        // resetForm,
        // isCreate,
    };
}
