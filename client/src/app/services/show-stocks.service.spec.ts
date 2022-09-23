import { TestBed } from '@angular/core/testing';

import { ShowStocksService } from './show-stocks.service';

describe('ShowStocksService', () => {
  let service: ShowStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
