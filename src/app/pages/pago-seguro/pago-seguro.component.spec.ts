/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagoSeguroComponent } from './pago-seguro.component';

describe('PagoSeguroComponent', () => {
  let component: PagoSeguroComponent;
  let fixture: ComponentFixture<PagoSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
