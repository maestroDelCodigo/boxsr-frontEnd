/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoServiceService } from './producto-service.service';

describe('Service: ProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoServiceService]
    });
  });

  it('should ...', inject([ProductoServiceService], (service: ProductoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
