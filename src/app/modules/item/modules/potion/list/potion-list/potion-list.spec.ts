import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotionList } from './potion-list';

describe('PotionList', () => {
  let component: PotionList;
  let fixture: ComponentFixture<PotionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
