import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AuthService } from '@cswp/auth'
import { Movie } from '../../movie.model'

@Component({
  selector: 'cswp-feature-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() movie!: Movie
  @Output() delete = new EventEmitter<string>()

  constructor(public authService: AuthService) {}

  onDelete(id: string | undefined): void {
    this.delete.emit(id)
  }
}
