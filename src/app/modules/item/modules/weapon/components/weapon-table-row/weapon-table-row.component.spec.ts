import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponTableRowComponent } from './weapon-table-row.component';

describe('WeaponTableRowComponent', () => {
  let component: WeaponTableRowComponent;
  let fixture: ComponentFixture<WeaponTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponTableRowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
