import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';
import { SolicitacaoVinculoService } from './solicitacao-vinculo.service';
import { SolicitacaoVinculoComponent } from './solicitacao-vinculo.component';
import { SolicitacaoVinculoDetailComponent } from './solicitacao-vinculo-detail.component';
import { SolicitacaoVinculoUpdateComponent } from './solicitacao-vinculo-update.component';
import { SolicitacaoVinculoDeletePopupComponent } from './solicitacao-vinculo-delete-dialog.component';
import { ISolicitacaoVinculo } from 'app/shared/model/solicitacao-vinculo.model';

@Injectable({ providedIn: 'root' })
export class SolicitacaoVinculoResolve implements Resolve<ISolicitacaoVinculo> {
    constructor(private service: SolicitacaoVinculoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SolicitacaoVinculo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SolicitacaoVinculo>) => response.ok),
                map((solicitacaoVinculo: HttpResponse<SolicitacaoVinculo>) => solicitacaoVinculo.body)
            );
        }
        return of(new SolicitacaoVinculo());
    }
}

export const solicitacaoVinculoRoute: Routes = [
    {
        path: 'solicitacao-vinculo',
        component: SolicitacaoVinculoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoVinculos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'solicitacao-vinculo/:id/view',
        component: SolicitacaoVinculoDetailComponent,
        resolve: {
            solicitacaoVinculo: SolicitacaoVinculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoVinculos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'solicitacao-vinculo/new',
        component: SolicitacaoVinculoUpdateComponent,
        resolve: {
            solicitacaoVinculo: SolicitacaoVinculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoVinculos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'solicitacao-vinculo/:id/edit',
        component: SolicitacaoVinculoUpdateComponent,
        resolve: {
            solicitacaoVinculo: SolicitacaoVinculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoVinculos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicitacaoVinculoPopupRoute: Routes = [
    {
        path: 'solicitacao-vinculo/:id/delete',
        component: SolicitacaoVinculoDeletePopupComponent,
        resolve: {
            solicitacaoVinculo: SolicitacaoVinculoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SolicitacaoVinculos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
