/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvisoLegalComponent } from './avisoLegal.component';

describe('AvisoLegalComponent', () => {
  let component: AvisoLegalComponent;
  let fixture: ComponentFixture<AvisoLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
