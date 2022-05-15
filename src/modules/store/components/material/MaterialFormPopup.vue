<template>
    <el-dialog
        width="50%"
        v-model="isShowBookingFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="material-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('store.formMaterial.materialDialog.titleCreate')
                        : $t('store.formMaterial.materialDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12">
                <BaseInputText
                    v-model:value="form.material"
                    :is-required="true"
                    :placeholder="$t('store.listMaterial.placeholder.material')"
                    :label="$t('store.formMaterial.material')"
                    :error="translateYupError(form.errors.material)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.quantity"
                    :placeholder="$t('store.listMaterial.placeholder.quantity')"
                    :label="$t('store.formMaterial.quantity')"
                    :error="translateYupError(form.errors.quantity)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.unit"
                    :error="translateYupError(form.errors.unit)"
                    :is-required="true"
                    :label="$t('store.formMaterial.unit')"
                    :placeholder="$t('store.listMaterial.placeholder.unit')"
                />
            </div>
        </div>
        <table-diagram />
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{ $t('store.formMaterial.button.cancel') }}
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
                            {{ $t('store.formMaterial.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { setup } from 'vue-class-component';
import { initData } from '../../composition/createForm';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
@Options({
    name: 'material-form-popup',
})
export default class MaterialFormPopUp extends mixins(UtilMixins) {
    get isDisabledSaveButton(): boolean {
        return storeModule.isDisabledSaveButton;
    }

    get isShowBookingFormPopUp(): boolean {
        return storeModule.isShowBookingFormPopUp || false;
    }

    set isShowBookingFormPopUp(val: boolean) {
        storeModule.setIsShowBookingFormPopUp(val);
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        storeModule.setIsShowBookingFormPopUp(false);
        storeModule.setSelectedBooking(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        storeModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        storeModule.setIsDisabledSaveButton(false);
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
