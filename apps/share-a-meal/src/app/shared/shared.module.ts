import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { ModalConfirmYesNoComponent } from './modal/modal.confirm-yes-no.component';
import { ModalLeaveYesNoComponent } from './modal/modal.leave-yes-no.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    AlertComponent,
    ModalConfirmYesNoComponent,
    ModalLeaveYesNoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SpinnerComponent, NavbarComponent, FooterComponent, AlertComponent],
})
export class SharedModule {}
