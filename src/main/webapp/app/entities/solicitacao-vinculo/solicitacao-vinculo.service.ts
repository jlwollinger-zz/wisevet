import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

type EntityResponseType = HttpResponse<ISolicitacaoVinculo>;
type EntityArrayResponseType = HttpResponse<ISolicitacaoVinculo[]>;

@Injectable({ providedIn: 'root' })
export class SolicitacaoVinculoService {
    public resourceUrl = SERVER_API_URL + 'api/solicitacao-vinculos';

    constructor(private http: HttpClient) {}

    create(solicitacaoVinculo: ISolicitacaoVinculo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(solicitacaoVinculo);
        return this.http
            .post<ISolicitacaoVinculo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(solicitacaoVinculo: ISolicitacaoVinculo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(solicitacaoVinculo);
        return this.http
            .put<ISolicitacaoVinculo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISolicitacaoVinculo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISolicitacaoVinculo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(solicitacaoVinculo: ISolicitacaoVinculo): ISolicitacaoVinculo {
        const copy: ISolicitacaoVinculo = Object.assign({}, solicitacaoVinculo, {
            dataEnvio:
                solicitacaoVinculo.dataEnvio != null && solicitacaoVinculo.dataEnvio.isValid()
                    ? solicitacaoVinculo.dataEnvio.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dataEnvio = res.body.dataEnvio != null ? moment(res.body.dataEnvio) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((solicitacaoVinculo: ISolicitacaoVinculo) => {
                solicitacaoVinculo.dataEnvio = solicitacaoVinculo.dataEnvio != null ? moment(solicitacaoVinculo.dataEnvio) : null;
            });
        }
        return res;
    }
}
