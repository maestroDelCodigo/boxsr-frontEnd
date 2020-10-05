import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionesListComponent } from './colecciones-list.component';

describe('ProductosListComponent', () => {
  let component: ColeccionesListComponent;
  let fixture: ComponentFixture<ColeccionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColeccionesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColeccionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
