import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonAdminComponent } from './buzon-admin.component';

describe('BuzonAdminComponent', () => {
  let component: BuzonAdminComponent;
  let fixture: ComponentFixture<BuzonAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuzonAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
