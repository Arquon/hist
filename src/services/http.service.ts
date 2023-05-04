import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import configFile from "@@/config/config.json";

function fireBaseDataParse(response: AxiosResponse<any, any>): any {
   const { data } = response;
   if (data && !data.id) {
      return Object.values(response.data).map((value) => value);
   }
   return data;
}

const httpService = axios.create({
   baseURL: configFile.baseURL,
});

httpService.interceptors.request.use(function (config): InternalAxiosRequestConfig<any> {
   if (configFile.isFireBase) {
      if (config.url === undefined) return config;
      const containSlash = /\/$/gi.test(config.url);
      if (containSlash) {
         config.url = config.url.slice(0, -1) + ".json";
      }
   }

   return config;
});

httpService.interceptors.response.use(function (response): AxiosResponse<any, any> {
   if (configFile.isFireBase) {
      return { ...response, data: fireBaseDataParse(response) };
   }

   return response;
});

export default httpService;
