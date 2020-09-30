import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreBoxsrComponent } from './sobre-boxsr.component';

describe('SobreBoxsrComponent', () => {
  let component: SobreBoxsrComponent;
  let fixture: ComponentFixture<SobreBoxsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobreBoxsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreBoxsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
