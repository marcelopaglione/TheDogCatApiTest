import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsComponent } from './components/cats/cats.component';
import { DogsComponent } from './components/dogs/dogs.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cats' },
  { path: 'cats', component: CatsComponent },
  { path: 'dogs', component: DogsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
