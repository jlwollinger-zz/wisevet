import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVacina } from 'app/shared/model/vacina.model';

type EntityResponseType = HttpResponse<IVacina>;
type EntityArrayResponseType = HttpResponse<IVacina[]>;

@Injectable({ providedIn: 'root' })
export class VacinaService {
    public resourceUrl = SERVER_API_URL + 'api/vacinas';

    constructor(private http: HttpClient) {}

    create(vacina: IVacina): Observable<EntityResponseType> {
        return this.http.post<IVacina>(this.resourceUrl, vacina, { observe: 'response' });
    }

    update(vacina: IVacina): Observable<EntityResponseType> {
        return this.http.put<IVacina>(this.resourceUrl, vacina, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVacina>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVacina[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
