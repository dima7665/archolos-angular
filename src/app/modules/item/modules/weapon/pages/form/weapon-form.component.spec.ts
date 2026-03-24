import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponFormComponent } from './weapon-form.component';

describe('WeaponFormComponent', () => {
  let component: WeaponFormComponent;
  let fixture: ComponentFixture<WeaponFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
