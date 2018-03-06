import { Http, URLSearchParams, RequestMethod, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ApiInterceptors } from '../api-client/api-interceptors';
const config = require('../../../../config/config.json');

import 'rxjs/add/operator/map';

export type UrlPart = string | number;

export interface ISimpleResourceOptions {
    suppressBusy: boolean;
}

export interface ISimpleResourceRequestOptionsArgs extends RequestOptionsArgs {
    simpleResourceOptions: ISimpleResourceOptions;
}

@Injectable()
export class SimpleResource {
    url: string;
    private config:any = config;

    constructor(private http: Http, private interceptors: ApiInterceptors) {
    }

    path(...urlParts: UrlPart[]): SimpleResource {
        const newResource = new SimpleResource(this.http, this.interceptors);
        newResource.url = this.combineUrlPartsWithCurrentUrl(urlParts);

        return newResource;
    }

    private makeRequest<T>(method: RequestMethod,
                           url: string = null,
                           data: any = null,
                           searchParams?: {},
                           options: ISimpleResourceOptions = null): Observable<T> {

        const requestArgs: ISimpleResourceRequestOptionsArgs = {
                simpleResourceOptions: options,
                method,
                headers: new Headers({
                        'Content-Type': 'application/json; charset=utf-8'
                    })
            };

        const requestUrl = this.config.ApiUrl + (url != null ? `${this.url}/${url}` : this.url);

        if (data != null) {
            requestArgs.body = JSON.stringify(data);
        }
        if (searchParams != null) {
            const search = new URLSearchParams();
            for (let param in searchParams) {
                if (searchParams.hasOwnProperty(param)) {
                    search.set(param, searchParams[param]);
                }
            }
            requestArgs.search = search;
        }

        this.interceptors.interceptRequest(requestArgs);
  console.log(requestUrl);
        const response = this.http.request(requestUrl, requestArgs);
        if (!response) {
            throw `Serious failure to issue {method} to {requestUrl}, problem in a test?`;
        }

        const intercepted = this.interceptors.interceptResponse(response);
        if (!intercepted) {
            throw `Serious failure to issue interception of {method} to {requestUrl}, problem in a test?`;
        }

        return intercepted.map(res => {
            // tslint:disable-next-line:no-string-literal
            if (res == null || res['_body'] === null || res['_body'] === '') {
                return null;
            }
            return res.json();
        });
    }

    get<T>(url?: string, searchParams?: {}, suppressBusy: boolean = false): Observable<T> {
        return this.makeRequest<T>(RequestMethod.Get,
            url,
            null,
            searchParams,
            {
                suppressBusy
            });
    }

    post<T>(url?: string, data: any = null, searchParams?: {}, suppressBusy: boolean = false): Observable<T> {        
        return this.makeRequest<T>(RequestMethod.Post,
            url,
            data,
            searchParams,
            {
                suppressBusy
            });
    }

    put(url?: string, data: any = null, searchParams?: {}, suppressBusy: boolean = false) {
        return this.makeRequest(RequestMethod.Put,
            url,
            data,
            searchParams,
            {
                suppressBusy
            });
    }

    delete(url?: string, searchParams?: {}, suppressBusy: boolean = false) {
        return this.makeRequest(RequestMethod.Delete,
            url,
            null,
            searchParams,
            {
                suppressBusy
            });
    }

    head(url?: string, searchParams?: {}, suppressBusy: boolean = false) {
        return this.makeRequest(RequestMethod.Head,
            url,
            null,
            searchParams,
            {
                suppressBusy
            });
    }

    private combineUrlPartsWithCurrentUrl(urlParts: UrlPart[]): string {
        if (this.url != null) {
            urlParts.unshift(this.url);
        }
        return urlParts.join('/');
    }
}
