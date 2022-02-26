import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() delete = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onDelete(id: string | undefined): void {
    this.delete.emit(id);
  }
}
