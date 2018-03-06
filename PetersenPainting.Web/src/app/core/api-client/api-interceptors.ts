import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface IRequestInterceptor {
    beforeRequest(request: RequestOptionsArgs): any;
    withResponse(response: Observable<Response>): any;
}

export class ApiInterceptors {
    interceptors: IRequestInterceptor[] = [];

    addInterceptor(interceptor: IRequestInterceptor): void {
        this.interceptors.push(interceptor);
    }

    interceptRequest(request: RequestOptionsArgs) {
        for (let interceptor of this.interceptors) {
            interceptor.beforeRequest(request);
        }
    }

    interceptResponse(response: Observable<Response>): Observable<Response> {
        let newResponse = response;
        for (let interceptor of this.interceptors) {
            newResponse = interceptor.withResponse(newResponse);
        }
        return newResponse;
    }
}
