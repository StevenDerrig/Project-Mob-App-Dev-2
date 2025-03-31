import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySumPageComponent } from './daily-sum-page.component';

describe('DailySumPageComponent', () => {
  let component: DailySumPageComponent;
  let fixture: ComponentFixture<DailySumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailySumPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailySumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
