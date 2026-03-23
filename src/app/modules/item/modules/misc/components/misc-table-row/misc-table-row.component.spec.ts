import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscTableRowComponent } from './misc-table-row.component';

describe('MiscTableRowComponent', () => {
  let component: MiscTableRowComponent;
  let fixture: ComponentFixture<MiscTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscTableRowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
