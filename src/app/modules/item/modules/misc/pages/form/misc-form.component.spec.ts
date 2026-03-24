import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscFormComponent } from './misc-form.component';

describe('MiscAddComponent', () => {
  let component: MiscFormComponent;
  let fixture: ComponentFixture<MiscFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
