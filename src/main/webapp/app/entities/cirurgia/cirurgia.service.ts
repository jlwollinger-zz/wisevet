import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICirurgia } from 'app/shared/model/cirurgia.model';

type EntityResponseType = HttpResponse<ICirurgia>;
type EntityArrayResponseType = HttpResponse<ICirurgia[]>;

@Injectable({ providedIn: 'root' })
export class CirurgiaService {
    public resourceUrl = SERVER_API_URL + 'api/cirurgias';

    constructor(private http: HttpClient) {}

    create(cirurgia: ICirurgia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cirurgia);
        return this.http
            .post<ICirurgia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cirurgia: ICirurgia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cirurgia);
        return this.http
            .put<ICirurgia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICirurgia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICirurgia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(cirurgia: ICirurgia): ICirurgia {
        const copy: ICirurgia = Object.assign({}, cirurgia, {
            dataHora: cirurgia.dataHora != null && cirurgia.dataHora.isValid() ? cirurgia.dataHora.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataHora = res.body.dataHora != null ? moment(res.body.dataHora) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((cirurgia: ICirurgia) => {
                cirurgia.dataHora = cirurgia.dataHora != null ? moment(cirurgia.dataHora) : null;
            });
        }
        return res;
    }
}
