<template>
    <div>
        <el-dialog
            :title="$t(`asset.list.confirmApprove.updateApproveQuantityTitle`)"
            v-model="isShowApprovePopup"
            width="450px"
            custom-class="confirm-dialog"
            @closed="closePopup"
            @open="approveQuantityForm.openPopup"
        >
            <el-form>
                <div class="col-12 col-lg-12 request-quantity">
                    <div class="label">
                        {{ $t('asset.list.fields.requestQuantity') }}:
                    </div>
                    {{ approveQuantityForm.requestQuantity }}
                </div>
                <div class="col-12 col-lg-12">
                    <BaseInputNumber
                        v-model:value="approveQuantityForm.approveQuantity"
                        :label="$t('asset.list.fields.approveQuantity')"
                        name="approveQuantity"
                        :is-required="true"
                        :min="1"
                        :error="
                            translateYupError(approveQuantityForm.errors.approveQuantity)
                        "
                        @change="onChangeInputQuantity"
                    />
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closePopup()">{{
                        $t(`asset.list.confirmApprove.cancelButtonText`)
                    }}</el-button>
                    <el-button
                        type="primary"
                        @click="onClickApproveSubmit()"
                        :disabled="isDisabledApproveButton"
                    >
                        {{ $t(`asset.list.confirmApprove.confirmButtonText`) }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { setup } from 'vue-class-component';
import { requestAssetModule } from '../../store/requestAsset.store';
import { initData } from '../../composition/approveQuantityForm';

export default class ApprovePopup extends UtilMixins {
    get isDisabledApproveButton(): boolean {
        return requestAssetModule.isDisabledApproveButton;
    }

    get isShowApprovePopup(): boolean {
        return requestAssetModule.isShowApprovePopup || false;
    }

    set isShowApprovePopup(val: boolean) {
        requestAssetModule.setIsShowApprovePopUp(val);
    }

    approveQuantityForm = setup(() => initData());

    async onClickApproveSubmit(): Promise<void> {
        requestAssetModule.setIsDisabledApproveButton(true);
        await this.approveQuantityForm.onSubmit();
        requestAssetModule.setIsDisabledApproveButton(false);
    }

    closePopup(): void {
        requestAssetModule.setIsShowApprovePopUp(false);
        requestAssetModule.setSelectedRequestAsset(null);
        (this.approveQuantityForm.resetForm as () => void)();
    }
}
</script>
<style scoped lang="scss">
.request-quantity {
    display: flex;
    justify-content: flex-start;
    .label {
        text-align: initial;
        width: 100%;
        font-weight: bold;
        margin-bottom: 6px;
        width: 150px;
    }
}
:deep(.el-dialog__title) {
    font-weight: 600;
}
</style>
