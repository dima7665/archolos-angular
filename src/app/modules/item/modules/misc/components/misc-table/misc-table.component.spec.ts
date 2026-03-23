import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscTableComponent } from './misc-table.component';

describe('MiscTableComponent', () => {
  let component: MiscTableComponent;
  let fixture: ComponentFixture<MiscTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
