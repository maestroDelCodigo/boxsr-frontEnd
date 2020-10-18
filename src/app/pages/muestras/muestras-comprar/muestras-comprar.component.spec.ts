/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MuestrasComprarComponent } from './muestras-comprar.component';

describe('MuestrasComprarComponent', () => {
  let component: MuestrasComprarComponent;
  let fixture: ComponentFixture<MuestrasComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestrasComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestrasComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
