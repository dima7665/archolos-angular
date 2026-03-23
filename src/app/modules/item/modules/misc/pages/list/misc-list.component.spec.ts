import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscListComponent } from './misc-list.component';

describe('MiscListComponent', () => {
  let component: MiscListComponent;
  let fixture: ComponentFixture<MiscListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
