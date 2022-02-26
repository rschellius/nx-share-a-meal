import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/common/entity.service';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'users');
  }
}
