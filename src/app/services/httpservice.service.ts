import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  readonly URL_API = this.config.getConfig().backend.url;

  constructor(private config: ConfigService, private http: HttpClient) {}

  getMobiliariosFilter(data: any) {
    return this.http.get(this.URL_API + '/mobiliario', data);
  }

  getMobiliarioById(id: any) {
    return this.http.get(this.URL_API + '/mobiliario/' + id);
  }

  deleteMobiliario(token: string, id: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(this.URL_API + '/mobiliario/' + id, {
      headers: headers,
    });
  }

  updateMobiliario(token: string, data: any, id: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(this.URL_API + '/mobiliario/' + id, data, {
      headers: headers,
    });
  }

  createMobiliario(token: string, data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(this.URL_API + '/mobiliario', data, {
      headers: headers,
    });
  }

  mobiliarioByEmpleado(token: string, idEmpleado: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(this.URL_API + '/mobiliario/empleado' + idEmpleado, {
      headers: headers,
    });
  }

  updateCount(id: any, count: any) {
    return this.http.patch(this.URL_API + '/mobiliario/' + id, {
      count: count,
    });
  }

  getPopularMobiliarios() {
    return this.http.get(this.URL_API + '/mobiliario/popular');
  }

  getCiudades() {
    return this.http.get(this.URL_API + '/ciudades') as any;
  }
}
