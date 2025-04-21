import { Injectable } from '@angular/core';
import { Endpoints } from 'src/environments/endpoints';
import { ILoginRes, ILoginReq } from '../model/http/security.model';
import { Observable } from 'rxjs';
import { ConsumeService } from './consume.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private consume: ConsumeService) {}

  // MÉTODO DE EJEMPLO, BORRAR EN PROYECTO REAL
  login(req: ILoginReq): Observable<ILoginRes> {
    return this.consume.httpPost(Endpoints.security.login, req);
  }
}
