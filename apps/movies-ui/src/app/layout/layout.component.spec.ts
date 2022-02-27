/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { Component, Directive, Input, HostListener } from '@angular/core'
import { LayoutComponent } from './layout.component'

//
// Since the component.component.html template uses some component selectors,
// we need to stub these in the test.
//
@Component({ selector: 'movies-ui-footer', template: '' })
class FooterStubComponent {}

@Component({ selector: 'movies-ui-navbar', template: '' })
class NavbarStubComponent {
  @Input() title!: string
}

@Component({ selector: 'movies-ui-alert', template: '' })
class AlertStubComponent {}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any
  navigatedTo: any = null

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams
  }
}

//
// The test suite for LayoutComponent.
//
describe('LayoutComponent', () => {
  let fixture: ComponentFixture<LayoutComponent>
  let component: LayoutComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent, // The 'real' component that we will test
        AlertStubComponent, // Required stubbed components
        FooterStubComponent,
        NavbarStubComponent,
        RouterOutletStubComponent,
        RouterLinkStubDirective
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LayoutComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create the component', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it(`should have as title 'Angular'`, () => {
    fixture.detectChanges()
    expect(component.apptitle).toEqual('Angular')
  })
})
