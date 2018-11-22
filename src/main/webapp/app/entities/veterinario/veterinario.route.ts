import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Veterinario } from 'app/shared/model/veterinario.model';
import { VeterinarioService } from './veterinario.service';
import { VeterinarioComponent } from './veterinario.component';
import { VeterinarioDetailComponent } from './veterinario-detail.component';
import { VeterinarioUpdateComponent } from './veterinario-update.component';
import { VeterinarioDeletePopupComponent } from './veterinario-delete-dialog.component';
import { IVeterinario } from 'app/shared/model/veterinario.model';

@Injectable({ providedIn: 'root' })
export class VeterinarioResolve implements Resolve<IVeterinario> {
    constructor(private service: VeterinarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Veterinario> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Veterinario>) => response.ok),
                map((veterinario: HttpResponse<Veterinario>) => veterinario.body)
            );
        }
        return of(new Veterinario());
    }
}

export const veterinarioRoute: Routes = [
    {
        path: 'veterinario',
        component: VeterinarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Veterinarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veterinario/:id/view',
        component: VeterinarioDetailComponent,
        resolve: {
            veterinario: VeterinarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Veterinarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veterinario/new',
        component: VeterinarioUpdateComponent,
        resolve: {
            veterinario: VeterinarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Veterinarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'veterinario/:id/edit',
        component: VeterinarioUpdateComponent,
        resolve: {
            veterinario: VeterinarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Veterinarios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const veterinarioPopupRoute: Routes = [
    {
        path: 'veterinario/:id/delete',
        component: VeterinarioDeletePopupComponent,
        resolve: {
            veterinario: VeterinarioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Veterinarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
