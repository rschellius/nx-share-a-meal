export class UseCase {
  // Optioneel description attribuut
  description = '-';

  constructor(
    public id: string,
    public name: string,
    public actor: string,
    public precondition: string,
    public postcondition: string,
    public scenario: string[]
  ) {}
}
