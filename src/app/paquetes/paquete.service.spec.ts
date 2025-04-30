/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaqueteService } from './paquete.service';

describe('Service: Paquete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaqueteService]
    });
  });

  it('should ...', inject([PaqueteService], (service: PaqueteService) => {
    expect(service).toBeTruthy();
  }));
});
