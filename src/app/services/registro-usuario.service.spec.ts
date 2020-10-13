/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistroUsuarioService } from './registro-usuario.service';

describe('Service: RegistroUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroUsuarioService]
    });
  });

  it('should ...', inject([RegistroUsuarioService], (service: RegistroUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
