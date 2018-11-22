import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVeterinario } from 'app/shared/model/veterinario.model';

type EntityResponseType = HttpResponse<IVeterinario>;
type EntityArrayResponseType = HttpResponse<IVeterinario[]>;

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
    public resourceUrl = SERVER_API_URL + 'api/veterinarios';

    constructor(private http: HttpClient) {}

    create(veterinario: IVeterinario): Observable<EntityResponseType> {
        return this.http.post<IVeterinario>(this.resourceUrl, veterinario, { observe: 'response' });
    }

    update(veterinario: IVeterinario): Observable<EntityResponseType> {
        return this.http.put<IVeterinario>(this.resourceUrl, veterinario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVeterinario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVeterinario[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
