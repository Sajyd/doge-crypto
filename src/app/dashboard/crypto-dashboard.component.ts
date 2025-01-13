import { Component, OnInit } from '@angular/core';
import { CryptoService, CryptoAsset, Exchange } from '../crypto.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.css']
})
export class CryptoDashboardComponent implements OnInit {
  cryptoData$ = this.cryptoService.getCryptoData().pipe(
    catchError(error => {
      console.error('Error loading crypto data:', error);
      return of([]);
    })
  );

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {}

  percentToNumber(percent: string | null): number {
    if (!percent) return 0;
    return Number(percent);
  }

  getBestExchange(exchanges: Exchange[] | undefined): Exchange | null {
    if (!exchanges || exchanges.length === 0) return null;
    return exchanges.sort((a, b) => 
      parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr)
    )[0];
  }
}