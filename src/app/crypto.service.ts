import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, catchError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  volumeUsd24Hr: string;
  marketCapUsd: string;
  exchanges?: Exchange[];
}

export interface Exchange {
  exchangeId: string;
  volumeUsd24Hr: string;
  priceUsd: string;
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private baseUrl = 'https://api.coincap.io/v2';

  constructor(private http: HttpClient) {}

  getAsset(id: string): Observable<CryptoAsset> {
    return this.http.get<any>(`${this.baseUrl}/assets/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error fetching asset ${id}:`, error);
        throw error;
      })
    );
  }

  getAssetMarkets(id: string): Observable<Exchange[]> {
    return this.http.get<any>(`${this.baseUrl}/assets/${id}/markets`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error fetching markets for ${id}:`, error);
        throw error;
      })
    );
  }

  getCryptoData(): Observable<CryptoAsset[]> {
    const assets = ['dogecoin', 'bitcoin', 'ethereum'].map(id =>
      this.getAsset(id).pipe(
        mergeMap(asset => 
          this.getAssetMarkets(id).pipe(
            map(exchanges => ({ ...asset, exchanges })),
            catchError((e) => {
              console.log(e, "error")
              // If markets fetch fails, return asset without exchanges
              return [asset];
            })
          )
        ),
        catchError(() => {
          // If asset fetch fails, return empty object
          return [{ 
            id: '', 
            symbol: '', 
            name: 'Error loading asset', 
            priceUsd: '0', 
            changePercent24Hr: '0',
            volumeUsd24Hr: '0',
            marketCapUsd: '0'
          }];
        })
      )
    );

    return forkJoin(assets);
  }
}