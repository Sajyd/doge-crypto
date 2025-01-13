import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doge-tickets',
  templateUrl: './doge-tickets.component.html',
  styleUrls: ['./doge-tickets.component.css']
})
export class DogeTicketsComponent implements OnInit {
  ticketPrice = 4; // Prix en USD/EUR
  dogePrice = 0; // Prix en DOGE (à récupérer via API)
  numberOfTickets = 1;
  discount = 0.05; // 5% de réduction
  
  get totalPriceUSD(): number {
    const basePrice = this.ticketPrice * this.numberOfTickets;
    return this.numberOfTickets >= 2 ? basePrice * (1 - this.discount) : basePrice;
  }

  get totalPriceDOGE(): number {
    return this.totalPriceUSD / this.dogePrice;
  }

  constructor() {}

  ngOnInit(): void {
    // Simuler un prix DOGE (à remplacer par un appel API réel)
    this.dogePrice = 4; // Prix exemple: 1 DOGE = 0.15 USD
  }

  buyTickets(): void {
    const summary = {
      tickets: this.numberOfTickets,
      priceUSD: this.totalPriceUSD,
      priceDOGE: this.totalPriceDOGE,
      hasDiscount: this.numberOfTickets >= 2
    };
    alert(`Récapitulatif de votre achat:
    Nombre de tickets: ${summary.tickets}
    Prix total: $${summary.priceUSD.toFixed(2)} (${summary.priceDOGE.toFixed(2)} DOGE)
    ${summary.hasDiscount ? 'Réduction de 5% appliquée!' : ''}`);
  }
} 