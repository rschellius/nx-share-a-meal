import { Component, OnDestroy, OnInit } from '@angular/core'
import { of, Subscription } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '@cswp/auth'
import { Alert, AlertService } from '@cswp/util'
import { EntityService, IEntity } from '..'

@Component({
  selector: 'cswp-base-list',
  // templateUrl: './base.list.component.html',
  template: ``,
  styleUrls: []
})
export class BaseListComponent<T extends IEntity> implements OnInit, OnDestroy {
  items!: T[] | null
  subs: Subscription = new Subscription()
  httpOptions: any

  constructor(
    private itemService: EntityService<T>,
    protected alertService: AlertService,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.itemService
        .list()
        .pipe(
          catchError((error: Alert) => {
            this.alertService.error(error.message)
            return of([])
          })
        )
        .subscribe((items) => {
          console.log(items)
          this.items = items
        })
    )
  }

  // delete(itemId: string): void {
  //   this.modalService
  //     .open(ModalConfirmYesNoComponent)
  //     .result.then((result) => {
  //       console.log('from modal:', result)
  //       this.itemService
  //         .delete(itemId, this.httpOptions)
  //         .pipe(
  //           catchError((error: Alert) => {
  //             console.log(error)
  //             this.alertService.error(error.message)
  //             return of(false)
  //           })
  //         )
  //         .subscribe(() => this.loadBases())
  //         .unsubscribe()
  //     })
  //     .catch((error) => console.log('from modal', error))
  // }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }
}
