import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

export class AppSettings {
    serviceBaseUrl: string;
    productImageBaseUrl: string;
    profileImageBaseUrl: string;
    unavailableImageUrl: string;
}

export class IdentityServerSettings {
    authority: string;
    clientId: string;
    redirectUrl: string;
    silentRedirectUrl: string;
    logoutRedirectUrl: string;
}

export class PetersenPaintingSettings {
    appSettings: AppSettings;
    identityServerSettings: IdentityServerSettings;
    identityServerSettingsDcdc: IdentityServerSettings;
}

@Injectable()
export class ConfigService {
    settings: PetersenPaintingSettings;
    constructor(private http: Http) {
    }

    load() {
        // return new Promise((resolve, reject) => {
        //     this.http.get('api/config/settings')
        //         .map((res: Response) => res.json())
        //         .subscribe(
        //         (data: PetersenPaintingSettings) => {

        //             this.settings = data;
        //             resolve(true);
        //         },
        //         err => console.error(err)
        //         );
        // });
    }
}