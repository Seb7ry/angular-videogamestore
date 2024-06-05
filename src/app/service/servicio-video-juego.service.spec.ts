import { TestBed } from '@angular/core/testing';

import { ServicioVideoJuegoService } from './servicio-video-juego.service';

describe('ServicioVideoJuegoService', () => {
  let service: ServicioVideoJuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioVideoJuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
