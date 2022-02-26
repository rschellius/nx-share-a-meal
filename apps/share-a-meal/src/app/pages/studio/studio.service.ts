import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from 'src/app/shared/common/entity.service';
import { environment } from 'src/environments/environment';
import { Studio } from './studio.model';

@Injectable({
  providedIn: 'root',
})
export class StudioService extends EntityService<Studio> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'studios');
  }
}
