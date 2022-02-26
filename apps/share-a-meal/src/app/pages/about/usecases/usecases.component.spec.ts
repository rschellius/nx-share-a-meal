import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UsecasesComponent } from './usecases.component'
import { UsecaseComponent } from './usecase/usecase.component'

describe('UsecaseComponent', () => {
  let component: UsecasesComponent
  let fixture: ComponentFixture<UsecasesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsecasesComponent, UsecaseComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecasesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
