import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ShowStocksService {
  constructor(private http: HttpClient) {}
  getStocks(query?: string) {
    return this.http.get(`/sensex?${query}`);
  }

  createStock(data: any) {
    return this.http.post(`/sensex`, data);
  }
}
