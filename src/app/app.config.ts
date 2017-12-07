import { InjectionToken } from '@angular/core';
import { SMAppConfig } from './models/app.settings';
export const APP_CONFIG_TOKEN = new InjectionToken<SMAppConfig>("app.config");

let developmentAPI = "http://localhost:3000/api/v1/";
export const APP_CONFIG: SMAppConfig = {
    SM: {
        BASE_URL: developmentAPI
    },
    Cloudinary: {
        API_URL: 'https://api.cloudinary.com/v1_1/logic-square/image/upload',
        PRESET: 'h3h7rsmi'
    }
};