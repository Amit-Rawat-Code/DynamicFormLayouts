import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPortal } from './my-portal/my-portal';
import { CandidatePrint } from './candidate-print/candidate-print';
import { LoginCmp } from './login-cmp/login-cmp';

const routes: Routes = [
  {path:'',redirectTo:'cand-login',pathMatch:'full'},  
  {path:'cand-login',component:LoginCmp},  
  {path:'load-form',component:MyPortal},
  {path:'candidate-print',component:CandidatePrint}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
