/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PielComponent } from './piel.component';

describe('PielComponent', () => {
  let component: PielComponent;
  let fixture: ComponentFixture<PielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
