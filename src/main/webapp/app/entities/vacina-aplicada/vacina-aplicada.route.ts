import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VacinaAplicada } from 'app/shared/model/vacina-aplicada.model';
import { VacinaAplicadaService } from './vacina-aplicada.service';
import { VacinaAplicadaComponent } from './vacina-aplicada.component';
import { VacinaAplicadaDetailComponent } from './vacina-aplicada-detail.component';
import { VacinaAplicadaUpdateComponent } from './vacina-aplicada-update.component';
import { VacinaAplicadaDeletePopupComponent } from './vacina-aplicada-delete-dialog.component';
import { IVacinaAplicada } from 'app/shared/model/vacina-aplicada.model';

@Injectable({ providedIn: 'root' })
export class VacinaAplicadaResolve implements Resolve<IVacinaAplicada> {
    constructor(private service: VacinaAplicadaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VacinaAplicada> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VacinaAplicada>) => response.ok),
                map((vacinaAplicada: HttpResponse<VacinaAplicada>) => vacinaAplicada.body)
            );
        }
        return of(new VacinaAplicada());
    }
}

export const vacinaAplicadaRoute: Routes = [
    {
        path: 'vacina-aplicada',
        component: VacinaAplicadaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VacinaAplicadas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina-aplicada/:id/view',
        component: VacinaAplicadaDetailComponent,
        resolve: {
            vacinaAplicada: VacinaAplicadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VacinaAplicadas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina-aplicada/new',
        component: VacinaAplicadaUpdateComponent,
        resolve: {
            vacinaAplicada: VacinaAplicadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VacinaAplicadas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vacina-aplicada/:id/edit',
        component: VacinaAplicadaUpdateComponent,
        resolve: {
            vacinaAplicada: VacinaAplicadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VacinaAplicadas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vacinaAplicadaPopupRoute: Routes = [
    {
        path: 'vacina-aplicada/:id/delete',
        component: VacinaAplicadaDeletePopupComponent,
        resolve: {
            vacinaAplicada: VacinaAplicadaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'VacinaAplicadas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
