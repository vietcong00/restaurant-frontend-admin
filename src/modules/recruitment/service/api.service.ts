import { IBodyResponse } from '@/common/types';
import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import {
    ICandidateEmail,
    ISendGridEmailTemplateBody,
    IEmailTemplate,
    IUpdateCandidateEmail,
} from '../types';

class RecruitmentService extends BaseService {
    async getCandidateById(id: number): Promise<IBodyResponse> {
        return await this.client.get(`${this.detailUrl}/${id}`);
    }

    async updateCandidateEmail(
        id: number,
        data: IUpdateCandidateEmail,
    ): Promise<IBodyResponse> {
        data = this.beforeUpdate<IUpdateCandidateEmail>(data);
        return await this.client.patch(`${this.detailUrl}/candidate-email/${id}`, data);
    }

    async updateInterview(
        id: number,
        data: Record<string, string | number | Date>,
    ): Promise<IBodyResponse> {
        data = this.beforeUpdate<Record<string, string | number | Date>>(data);
        return await this.client.patch(`${this.detailUrl}/interview/${id}`, data);
    }

    async deleteInterview(id: number): Promise<number> {
        const response = await this.client.delete(`${this.detailUrl}/interview/${id}`);
        return response.data.id;
    }

    async sendEmail(
        data: ISendGridEmailTemplateBody,
    ): Promise<IBodyResponse<ICandidateEmail>> {
        data = this.beforeSave<ISendGridEmailTemplateBody>(data);
        const response = (await this.client.post<IBodyResponse<ICandidateEmail>>(
            `${this.detailUrl}/email`,
            data,
        )) as unknown as IBodyResponse<ICandidateEmail>;
        return response;
    }

    async getEmailTemplates(): Promise<IEmailTemplate[]> {
        const result = await this.client.get<IEmailTemplate[]>(
            `${this.baseUrl}/email-template/send-grid`,
        );
        return result.data;
    }

    updateCandidateStatus<P>(id: number, body: P): Promise<IBodyResponse> {
        return this.client.patch(`${this.detailUrl}/${id}/status`, body);
    }
}

export const recruitmentService = new RecruitmentService(
    { baseUrl: '/candidate' },
    service,
);
export const interviewService = new BaseService(
    { baseUrl: '/candidate/interview' },
    service,
);
