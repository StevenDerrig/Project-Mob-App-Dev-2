import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanProdPageComponent } from './scan-prod-page.component';

describe('ScanProdPageComponent', () => {
  let component: ScanProdPageComponent;
  let fixture: ComponentFixture<ScanProdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanProdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanProdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
