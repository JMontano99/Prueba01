import { Injectable } from '@angular/core';
import { ConsumeService } from './consume.service';
import { Observable } from 'rxjs';
import { IColorsRes, IColorRes } from '../model/http/colors.model';
import { Endpoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(private consume: ConsumeService) {}

  getColors(): Observable<IColorsRes> {
    return this.consume.httpGet(Endpoints.demo.colors);
  }

  getColor(id: number): Observable<IColorRes> {
    return this.consume.httpGet(`${Endpoints.demo.colors}/${id}`);
  }
}
