import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import { BookingSchema } from '../constants';

export const validateBookingSchema = BookingSchema;

export function initData() {
    const { t } = useI18n();
    const initValues = {
        nameCustomer: '',
        phone: '',
        numberPeople: undefined,
        arrivalTime: undefined,
    };
    // const isCreate = computed(() => !menuModule.selectedBooking?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateBookingSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        // const createBody = {
        //     ...values,
        //     nameCustomer: values.nameCustomer?.trim(),
        //     phone: values.phone,
        //     numberPeople: values.numberPeople,
        //     arrivalTime: moment(values.arrivalTime).utc().fmFullTimeWithoutSecond(),
        // } as IBookingCreate;
        // let response;
        // // const bookingId = menuModule.selectedBooking?.id;
        // const loading = ElLoading.service({
        //     target: '.booking-form-popup',
        // });
        // if (!isCreate.value) {
        //     response = await bookingService.update(bookingId as number, createBody);
        // } else {
        //     response = await bookingService.create(createBody);
        // }
        // loading.close();
        // if (response.success) {
        //     showSuccessNotificationFunction(
        //         !isCreate.value
        //             ? t('booking.list.message.update.success')
        //             : (t('booking.list.message.create.success') as string),
        //     );
        //     menuModule.setBookingQueryString({
        //         page: DEFAULT_FIRST_PAGE,
        //     });
        //     const loading = ElLoading.service({
        //         target: '.content',
        //     });
        //     await menuModule.getBookings();
        //     loading.close();
        //     await menuModule.setIsShowBookingFormPopUp(false);
        // } else {
        //     showErrorNotificationFunction(response.message as string);
        //     if (response.code === HttpStatus.ITEM_NOT_FOUND) {
        //         menuModule.setIsShowBookingFormPopUp(false);
        //         const loading = ElLoading.service({
        //             target: '.content',
        //         });
        //         await menuModule.getBookings();
        //         loading.close();
        //     }
        // }
    });
    const { value: nameCustomer } = useField('nameCustomer');
    const { value: phone } = useField('phone');
    const { value: numberPeople } = useField('numberPeople');
    const { value: arrivalTime } = useField('arrivalTime');

    const openPopup = async () => {
        // if (!isCreate.value) {
        //     const loading = ElLoading.service({
        //         target: '.booking-form-popup',
        //     });
        //     const bookingDetail = (await bookingService.getDetail(
        //         menuModule.selectedBooking?.id || 0,
        //     )) as IBodyResponse<IBooking>;
        //     loading.close();
        //     resetForm({
        //         values: {
        //             nameCustomer: bookingDetail.data?.nameCustomer,
        //             phone: bookingDetail.data?.phone,
        //             numberPeople: bookingDetail.data?.numberPeople,
        //             arrivalTime: moment(bookingDetail.data?.arrivalTime).fmDayString(),
        //         },
        //     });
        // } else {
        //     resetForm({
        //         values: initValues,
        //     });
        // }
    };
    return {
        nameCustomer,
        phone,
        numberPeople,
        arrivalTime,
        errors,

        validate,
        openPopup,
        onSubmit,
        resetForm,
        // isCreate,
    };
}
