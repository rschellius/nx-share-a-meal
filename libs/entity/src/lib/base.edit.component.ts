import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { of, Subscription } from 'rxjs'
import {
  catchError,
  switchMap,
  tap,
} from 'rxjs/operators'
import { AuthService } from '@cswp/auth'
import { Alert, AlertService } from '@cswp/util'
import { EntityService, IEntity } from '..'

@Component({
  selector: 'cswp-entity-base-edit',
  template: ``
})
export class BaseEditComponent<T extends IEntity> implements OnInit, OnDestroy {
  title = ''
  item!: T
  httpOptions: any
  debug = false
  subscriptions: Subscription = new Subscription()

  /**
   * 
   */
  constructor(
    private entityService: EntityService<T>,
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    // Get the item to edit
    this.subscriptions.add(this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            console.log('GEEN id gevonden')
            // maak een lege item
            return of({} as T)
          } else {
            console.log('WEL een id gevonden')
            // haal de item met gevraagde id via de api
            return this.entityService.read(params.get('id'))
          }
        }),
        tap(console.log),
      )
      .subscribe((item: T) => {
        this.item = item
      }))

  }

  // Save item via the service
  onSubmit(): void {
    console.log('onSubmit', this.item)

    if (this.item.id) {
      // A item with id must have been saved before, so it must be an update.
      console.log('update item')
      this.subscriptions.add(this.entityService
        .update(this.item, this.httpOptions)
        .pipe(
          catchError((error: Alert) => {
            console.log(error)
            this.alertService.error(error.message)
            return of(false)
          })
        )
        .subscribe((success) => {
          console.log(success)
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route })
          }
        }))
    } else {
      // A item without id has not been saved to the database before.
      console.log('create item')
      this.subscriptions.add(this.entityService
        .create(this.item, this.httpOptions)
        .pipe(
          catchError((error: Alert) => {
            console.log(error)
            this.alertService.error(error.message)
            return of(false)
          })
        )
        .subscribe((success) => {
          console.log(success)
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route })
          }
        }))
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }
}
