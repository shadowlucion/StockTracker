import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowStocksService } from '../services/show-stocks.service';

@Component({
  selector: 'app-sensex',
  templateUrl: './sensex.component.html',
  styleUrls: ['./sensex.component.css'],
})
export class SensexComponent implements OnInit {
  classHeading = 'sensex';
  // @ViewChild('heading') h1: ElementRef;
  constructor(private ss: ShowStocksService) {}

  fetchStocks() {
    this.ss.getStocks().subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchStocks();
  }
}
