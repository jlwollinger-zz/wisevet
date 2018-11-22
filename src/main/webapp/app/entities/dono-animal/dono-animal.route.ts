import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DonoAnimal } from 'app/shared/model/dono-animal.model';
import { DonoAnimalService } from './dono-animal.service';
import { DonoAnimalComponent } from './dono-animal.component';
import { DonoAnimalDetailComponent } from './dono-animal-detail.component';
import { DonoAnimalUpdateComponent } from './dono-animal-update.component';
import { DonoAnimalDeletePopupComponent } from './dono-animal-delete-dialog.component';
import { IDonoAnimal } from 'app/shared/model/dono-animal.model';

@Injectable({ providedIn: 'root' })
export class DonoAnimalResolve implements Resolve<IDonoAnimal> {
    constructor(private service: DonoAnimalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DonoAnimal> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DonoAnimal>) => response.ok),
                map((donoAnimal: HttpResponse<DonoAnimal>) => donoAnimal.body)
            );
        }
        return of(new DonoAnimal());
    }
}

export const donoAnimalRoute: Routes = [
    {
        path: 'dono-animal',
        component: DonoAnimalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DonoAnimals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dono-animal/:id/view',
        component: DonoAnimalDetailComponent,
        resolve: {
            donoAnimal: DonoAnimalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DonoAnimals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dono-animal/new',
        component: DonoAnimalUpdateComponent,
        resolve: {
            donoAnimal: DonoAnimalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DonoAnimals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dono-animal/:id/edit',
        component: DonoAnimalUpdateComponent,
        resolve: {
            donoAnimal: DonoAnimalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DonoAnimals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donoAnimalPopupRoute: Routes = [
    {
        path: 'dono-animal/:id/delete',
        component: DonoAnimalDeletePopupComponent,
        resolve: {
            donoAnimal: DonoAnimalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DonoAnimals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
