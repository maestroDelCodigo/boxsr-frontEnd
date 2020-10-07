import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarColeccionComponent } from './modificar-coleccion.component';

describe('ModificarColeccionComponent', () => {
  let component: ModificarColeccionComponent;
  let fixture: ComponentFixture<ModificarColeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarColeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
