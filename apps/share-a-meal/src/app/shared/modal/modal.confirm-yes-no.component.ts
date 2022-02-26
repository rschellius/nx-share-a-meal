import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-yes-no',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirmation</h4>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete this item?</p>
      <p>
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})
export class ModalConfirmYesNoComponent implements OnInit {
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
