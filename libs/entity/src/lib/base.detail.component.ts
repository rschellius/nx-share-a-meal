import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from '@cswp/auth'
import { EntityService, IEntity } from '..'

@Component({
  selector: 'cswp-entity-base-detail',
  template: ` <h1>Hier de titel</h1> `
})
export class BaseDetailComponent<T extends IEntity>
  implements OnInit, OnDestroy
{
  item!: T
  subs: Subscription = new Subscription()

  constructor(
    private itemService: EntityService<T>,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.itemService.read(params.get('id'))
          )
        )
        .subscribe((item) => (this.item = item))
    )
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }
}
