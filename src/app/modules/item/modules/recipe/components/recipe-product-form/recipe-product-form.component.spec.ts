import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeProductFormComponent } from './recipe-product-form.component';

describe('RecipeProductFormComponent', () => {
  let component: RecipeProductFormComponent;
  let fixture: ComponentFixture<RecipeProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeProductFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
