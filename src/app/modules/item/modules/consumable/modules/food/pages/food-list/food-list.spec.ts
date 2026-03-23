import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListComponent } from './food-list';

describe('FoodList', () => {
  let component: FoodListComponent;
  let fixture: ComponentFixture<FoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
