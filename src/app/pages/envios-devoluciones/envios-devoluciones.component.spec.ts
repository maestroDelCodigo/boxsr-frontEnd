/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnviosDevolucionesComponent } from './envios-devoluciones.component';

describe('EnviosDevolucionesComponent', () => {
  let component: EnviosDevolucionesComponent;
  let fixture: ComponentFixture<EnviosDevolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosDevolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
