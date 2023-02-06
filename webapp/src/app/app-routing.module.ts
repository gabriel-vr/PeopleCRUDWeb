import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './Components/pessoas/pessoas.component';

const routes: Routes = [ {
  path: 'pessoas',
  component: PessoasComponent  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
