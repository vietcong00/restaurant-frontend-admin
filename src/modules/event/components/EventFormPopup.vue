<template>
    <el-dialog
        width="50%"
        v-model="isShowEventFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="event-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('event.form.eventDialog.titleCreate')
                        : $t('event.form.eventDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.title"
                    :is-required="true"
                    :placeholder="$t('event.list.placeholder.title')"
                    :label="$t('event.form.title')"
                    :error="translateYupError(form.errors.title)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.imageUrl"
                    :error="translateYupError(form.errors.imageUrl)"
                    :is-required="true"
                    :label="$t('event.form.imageUrl')"
                    :placeholder="$t('event.list.placeholder.img')"
                    :maxLength="INPUT_URL_MAX_LENGTH"
                />
            </div>
            <div class="col-md-6">
                <BaseDatePicker
                    v-model:value="form.startDate"
                    :placeholder="$t('event.list.placeholder.startDate')"
                    :label="$t('event.form.startDate')"
                    :error="translateYupError(form.errors.startDate)"
                    :is-required="true"
                    :min-date="DEFAULT_MIN_DATE"
                    :max-date="form.endDate"
                    :default-value="form.endDate"
                />
            </div>
            <div class="col-md-6">
                <BaseDatePicker
                    v-model:value="form.endDate"
                    :placeholder="$t('event.list.placeholder.endDate')"
                    :label="$t('event.form.endDate')"
                    :error="translateYupError(form.errors.endDate)"
                    :is-required="true"
                    :min-date="minEndDate"
                    :default-value="minEndDate"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.userQuantity"
                    :placeholder="$t('event.list.placeholder.quantity')"
                    :label="$t('event.form.quantity')"
                    :error="translateYupError(form.errors.userQuantity)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputMoney
                    v-model:value="form.budget"
                    :label="$t('event.form.budget')"
                    :placeholder="$t('event.list.placeholder.budget')"
                    :error="translateYupError(form.errors.budget)"
                />
            </div>
            <div class="col-md-12">
                <BaseInputTextarea
                    v-model:value="form.description"
                    :placeholder="$t('event.list.placeholder.desc')"
                    :label="$t('event.form.desc')"
                    :minRows="2"
                    autosize
                    :error="translateYupError(form.errors.description)"
                />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{ $t('event.form.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            type="primary"
                            @click="onClickSaveButton"
                            :disabled="isDisabledSaveButton"
                        >
                            {{ $t('event.form.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { setup } from 'vue-class-component';
import { initData } from '../composition/createForm';
import { eventModule } from '../store';
import { UtilMixins } from '@/mixins/utilMixins';
import moment from 'moment';

export default class EventFormPopUp extends UtilMixins {
    get isDisabledSaveButton(): boolean {
        return eventModule.isDisabledSaveButton;
    }

    get isShowEventFormPopUp(): boolean {
        return eventModule.isShowEventFormPopUp || false;
    }

    set isShowEventFormPopUp(val: boolean) {
        eventModule.setIsShowEventFormPopUp(val);
    }

    get minEndDate(): string | null {
        return this.form.startDate
            ? moment(this.form.startDate as string)
                  .subtract(1, 'days')
                  .fmDayString()
            : null;
    }

    get maxStartDate(): string | null {
        return this.form.endDate
            ? moment(this.form.endDate as string)
                  .add(1, 'days')
                  .fmDayString()
            : null;
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        eventModule.setIsShowEventFormPopUp(false);
        eventModule.setSelectedEvent(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        eventModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        eventModule.setIsDisabledSaveButton(false);
    }
}
</script>
<style lang="scss" scoped>
@media (max-width: 1199.98px) {
    :deep(.el-dialog) {
        width: 80%;
    }
}
.text-left {
    text-align: left;
}

:deep(.el-input-number .el-input__inner) {
    width: 100%;
    margin-bottom: 15px;
    height: 36px !important;
}
</style>
