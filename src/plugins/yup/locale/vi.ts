import capitalize from 'lodash/capitalize';
import { MessageContext, MessageFunctionCallable } from '@intlify/runtime';
import { DATE_TIME_FORMAT } from '@/common/constants';
import moment from 'moment-timezone';

export default {
    mixed: {
        required: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` là trường bắt buộc`;
        }) as MessageFunctionCallable,
        default: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} không hợp lệ`);
        }) as MessageFunctionCallable,
        selectRequired: `Đây là trường bắt buộc`,
        oneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` là trường bắt buộc`;
        }) as MessageFunctionCallable,
        notOneOf: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải là giá trị ngoại trừ: ${ctx.named('values')}`,
            );
        }) as MessageFunctionCallable,
        defined: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải được định nghĩa`);
        }) as MessageFunctionCallable,
    },

    string: {
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải đúng ${ctx.named('length')} ký tự`);
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải có ít nhất  ${ctx.named('length')} ký tự`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} không được vượt quá ${ctx.named('length')} ký tự`,
            );
        }) as MessageFunctionCallable,
        matches: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} không đúng định dạng`);
        }) as MessageFunctionCallable,
        email: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} không đúng định dạng`);
        }) as MessageFunctionCallable,
        url: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` phải đúng định dạng URL`;
        }) as MessageFunctionCallable,
        uuid: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName}`) + ` đúng địng dạng UUID`;
        }) as MessageFunctionCallable,
        trim: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải được cắt chuỗi`);
        }) as MessageFunctionCallable,
        lowercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải là chữ thường`);
        }) as MessageFunctionCallable,
        uppercase: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải là chữ hoa`);
        }) as MessageFunctionCallable,
    },

    number: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải có giá trị thấp nhất là ${ctx.named('min')}`,
            );
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} không được vượt quá ${ctx.named('max')}`);
        }) as MessageFunctionCallable,
        lessThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải ít hơn ${ctx.named('less')}`);
        }) as MessageFunctionCallable,
        moreThan: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải lớn hơn ${ctx.named('more')}`);
        }) as MessageFunctionCallable,
        positive: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải là số dương`);
        }) as MessageFunctionCallable,
        negative: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải là số âm`);
        }) as MessageFunctionCallable,
        integer: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải là số nguyên`);
        }) as MessageFunctionCallable,
    },

    date: {
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải nhỏ hơn ngày ${moment(
                    ctx.named('max') as string,
                ).format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON)}`,
            );
        }) as MessageFunctionCallable,
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải lớn hơn ngày ${moment(
                    ctx.named('min') as string,
                ).format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_COLON)}`,
            );
        }) as MessageFunctionCallable,
    },

    boolean: {
        isValue: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải có giá trị là ${ctx.named('value')}`);
        }) as MessageFunctionCallable,
    },

    array: {
        min: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải có ít nhất ${ctx.named('min')} phần tử`);
        }) as MessageFunctionCallable,
        max: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(
                `${fieldName} phải ít hơn hoặc bằng ${ctx.named('max')} phần tử`,
            );
        }) as MessageFunctionCallable,
        length: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải có ${ctx.named('length')} phần tử`);
        }) as MessageFunctionCallable,
    },

    object: {
        noUnknown: ((ctx: MessageContext) => {
            const fieldName = ctx.linked(`common.common.fields.${ctx.named('path')}`);
            return capitalize(`${fieldName} phải có khóa: ${ctx.named('unknown')}`);
        }) as MessageFunctionCallable,
    },
};
