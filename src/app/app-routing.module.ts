import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { MainLayoutResolver } from './layout/main-layout/main-layout.resolver';

const redirectLoggedInToProject = () => redirectLoggedInTo(['project']);
const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: 'auth', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToProject }, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'project', component: MainLayoutComponent, resolve: [MainLayoutResolver],   runGuardsAndResolvers: 'always', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToAuth }, loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
