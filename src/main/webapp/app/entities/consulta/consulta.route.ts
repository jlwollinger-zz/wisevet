import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { ConsultaComponent } from './consulta.component';
import { ConsultaDetailComponent } from './consulta-detail.component';
import { ConsultaUpdateComponent } from './consulta-update.component';
import { ConsultaDeletePopupComponent } from './consulta-delete-dialog.component';
import { IConsulta } from 'app/shared/model/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaResolve implements Resolve<IConsulta> {
    constructor(private service: ConsultaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Consulta> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Consulta>) => response.ok),
                map((consulta: HttpResponse<Consulta>) => consulta.body)
            );
        }
        return of(new Consulta());
    }
}

export const consultaRoute: Routes = [
    {
        path: 'consulta',
        component: ConsultaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta/:id/view',
        component: ConsultaDetailComponent,
        resolve: {
            consulta: ConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta/new',
        component: ConsultaUpdateComponent,
        resolve: {
            consulta: ConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta/:id/edit',
        component: ConsultaUpdateComponent,
        resolve: {
            consulta: ConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultaPopupRoute: Routes = [
    {
        path: 'consulta/:id/delete',
        component: ConsultaDeletePopupComponent,
        resolve: {
            consulta: ConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
