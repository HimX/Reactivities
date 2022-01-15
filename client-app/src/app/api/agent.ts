import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <ResponseType>(response: AxiosResponse<ResponseType>) => response.data;

const requests = {
    get: <ResponseType>(url: string) => axios.get<ResponseType>(url).then(responseBody),
    post: <ResponseType>(url: string, body: {}) => axios.post<ResponseType>(url, body).then(responseBody),
    put: <ResponseType>(url: string, body: {}) => axios.put<ResponseType>(url, body).then(responseBody),
    del: <ResponseType>(url: string) => axios.delete<ResponseType>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;