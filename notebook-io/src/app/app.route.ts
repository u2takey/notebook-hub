import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepoListComponent} from './repo.list';
import { RepoDetailComponent } from './repo.detail';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: RepoListComponent },
  { path: 'repo/:repo', component: RepoDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
