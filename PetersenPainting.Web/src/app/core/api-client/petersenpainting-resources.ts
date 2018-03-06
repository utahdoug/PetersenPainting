import { SimpleResource } from './simple-resource';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiInterceptors } from '../api-client/api-interceptors';
import { ConfigService, PetersenPaintingSettings } from '../config/config-service';

@Injectable()
export class PetersenPaintingResource extends SimpleResource {
    constructor(http: Http, interceptors: ApiInterceptors, config: ConfigService) {
        super(http, interceptors);
        this.url = PetersenPainting.Urls.portalUrl;
    }
}
