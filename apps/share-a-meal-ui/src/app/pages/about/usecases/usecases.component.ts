import { Component, OnInit } from '@angular/core'
import { UseCase } from '../usecase.model'

@Component({
  selector: 'nx-share-a-meal-about-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.css']
})
export class UsecasesComponent implements OnInit {
  readonly PLAIN_USER = 'Reguliere gebruiker'
  readonly ADMIN_USER = 'Administrator'

  useCases: UseCase[] = [
    {
      id: 'UC-01',
      name: 'Inloggen',
      description: 'Hiermee logt een bestaande gebruiker in.',
      scenario: [
        'Gebruiker vult email en password in en klikt op Login knop.',
        'De applicatie valideert de ingevoerde gegevens.',
        'Indien gegevens correct zijn dan redirect de applicatie naar het startscherm.'
      ],
      actor: this.PLAIN_USER,
      precondition: 'Geen',
      postcondition: 'De actor is ingelogd'
    },
    {
      id: 'UC-02',
      name: 'Naam',
      description: 'Hiermee kan een administrator ...',
      scenario: ['Stap 1', 'Stap 2', 'Stap 3'],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Het doel is bereikt.'
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
