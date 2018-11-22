import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

type EntityResponseType = HttpResponse<IVacinaAplicada>;
type EntityArrayResponseType = HttpResponse<IVacinaAplicada[]>;

@Injectable({ providedIn: 'root' })
export class VacinaAplicadaService {
    public resourceUrl = SERVER_API_URL + 'api/vacina-aplicadas';

    constructor(private http: HttpClient) {}

    create(vacinaAplicada: IVacinaAplicada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vacinaAplicada);
        return this.http
            .post<IVacinaAplicada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(vacinaAplicada: IVacinaAplicada): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vacinaAplicada);
        return this.http
            .put<IVacinaAplicada>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVacinaAplicada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVacinaAplicada[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(vacinaAplicada: IVacinaAplicada): IVacinaAplicada {
        const copy: IVacinaAplicada = Object.assign({}, vacinaAplicada, {
            dataAplicacao:
                vacinaAplicada.dataAplicacao != null && vacinaAplicada.dataAplicacao.isValid()
                    ? vacinaAplicada.dataAplicacao.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataAplicacao = res.body.dataAplicacao != null ? moment(res.body.dataAplicacao) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((vacinaAplicada: IVacinaAplicada) => {
                vacinaAplicada.dataAplicacao = vacinaAplicada.dataAplicacao != null ? moment(vacinaAplicada.dataAplicacao) : null;
            });
        }
        return res;
    }
}
