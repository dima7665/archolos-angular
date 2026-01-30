import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotionListComponent } from './potion-list';

describe('PotionList', () => {
  let component: PotionListComponent;
  let fixture: ComponentFixture<PotionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
