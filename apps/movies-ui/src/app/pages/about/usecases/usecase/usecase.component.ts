import { Component, OnInit, Input } from '@angular/core'
import { UseCase } from '../../usecase.model'

@Component({
  selector: 'movies-ui-usecase',
  template: `
    <table class="table table-sm table-bordered">
      <tbody>
        <tr class="table-primary">
          <th scope="row" style="width: 16.66%">Naam</th>
          <td>
            <strong>{{ useCase.id }} {{ useCase.name }}</strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Beschrijving</th>
          <td>{{ useCase.description }}</td>
        </tr>
        <tr>
          <th scope="row">Actor</th>
          <td>{{ useCase.actor }}</td>
        </tr>
        <tr>
          <th scope="row">Preconditie</th>
          <td>{{ useCase.precondition }}</td>
        </tr>
        <tr>
          <th scope="row">Scenario</th>
          <td>
            <ol>
              <li *ngFor="let step of useCase.scenario">{{ step }}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <th scope="row">Postconditie</th>
          <td>{{ useCase.postcondition }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class UsecaseComponent implements OnInit {
  @Input() useCase!: UseCase

  constructor() {}

  ngOnInit(): void {
    console.log('UsecaseComponent onInit')
  }
}
