import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-list',
    pathMatch: 'full'
  },
  {
    path: 'contact-list',
    loadChildren: () => import('./pages/contact-list/contact-list.module').then( m => m.ContactListPageModule)
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./pages/add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'update-contact',
    loadChildren: () => import('./pages/update-contact/update-contact.module').then( m => m.UpdateContactPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
