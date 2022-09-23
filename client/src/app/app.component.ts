import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowStocksService } from './services/show-stocks.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentPage = 1;
  params: Record<string, number | string> = {};
  query = '';
  name: string = '';
  stocks: any;
  result: any = [];
  isAdding = false;
  openEntry = new FormControl('');
  closeEntry = new FormControl('');
  errorInAdd = false;

  constructor(
    private webSocketService: SocketService,
    private socketService: SocketService,
    private stockData: ShowStocksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Logic for adding a stock.
  toggleStock() {
    this.isAdding = !this.isAdding;
    this.errorInAdd = false;
  }

  addStock(data: any) {
    data.date = new Date();
    this.stockData.createStock(data).subscribe({
      next: (data) => {
        this.webSocketService.emit('stockAdded', data);
        alert('Stock Added Successfully');
      },
      error: (e) => {
        alert('Error Occured!!!');
      },
    });
  }

  submitForm(data: any) {
    if (!data.open || !data.close || isNaN(data.open) || isNaN(data.close)) {
      this.errorInAdd = true;
      return;
    }
    this.errorInAdd = false;
    this.addStock(data);
  }

  // updateTop(data: any) {
  //   this.result.pop();
  //   this.result.unshift(data);
  // }

  // Getting Top records and Pagination logic.
  changePage(pageNumber: number) {
    this.params['page'] = pageNumber;
    this.createQuery();
    this.getStocks();

    this.router.navigate(['/'], {
      queryParams: this.params,
    });
  }

  next() {
    this.currentPage = this.currentPage * 1 + 1;
    this.changePage(this.currentPage);
  }

  previous() {
    this.currentPage = this.currentPage * 1 - 1;
    this.currentPage = Math.max(this.currentPage, 1);
    this.changePage(this.currentPage);
  }

  getStocks() {
    this.stockData.getStocks(this.query).subscribe((stocks: any) => {
      this.result = stocks;
    });
  }

  createQuery() {
    this.query = `page=${this.currentPage}`;
  }

  gettingPageData() {
    this.route.queryParams.subscribe((params) => {
      this.params = { page: params['page'] };
      this.currentPage = (this.params['page'] as number) || 1;
      console.log(this.currentPage);
      this.createQuery();
      this.getStocks();
    });
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params=>{
    //   this.params = {page: params['page']}
    //   this.currentPage = this.params['page'] as number || 1;
    //   console.log(this.currentPage)
    //   this.createQuery()
    //   this.getStocks()
    // })
    this.gettingPageData();

    this.webSocketService.listen('updateStockList').subscribe((data) => {
      this.gettingPageData();
      // this.updateTop(data);
    });
  }
}
