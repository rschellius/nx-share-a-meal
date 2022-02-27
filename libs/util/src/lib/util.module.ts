import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SpinnerComponent } from './spinner/spinner.component'
import { AlertComponent } from './alert/alert.component'
import { ModalConfirmYesNoComponent } from './modal/modal.confirm-yes-no.component'
import { ModalLeaveYesNoComponent } from './modal/modal.leave-yes-no.component'

@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    ModalConfirmYesNoComponent,
    ModalLeaveYesNoComponent
  ],
  imports: [CommonModule, NgbModule],
  exports: [
    SpinnerComponent,
    AlertComponent,
    ModalLeaveYesNoComponent,
    ModalConfirmYesNoComponent
  ]
})
export class UtilModule {}
