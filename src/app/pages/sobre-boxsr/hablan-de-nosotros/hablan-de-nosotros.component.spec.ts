/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HablanDeNosotrosComponent } from './hablan-de-nosotros.component';

describe('HablanDeNosotrosComponent', () => {
  let component: HablanDeNosotrosComponent;
  let fixture: ComponentFixture<HablanDeNosotrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HablanDeNosotrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HablanDeNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
