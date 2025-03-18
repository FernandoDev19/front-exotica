import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerCreateComponent } from './admin-banner-create.component';

describe('AdminBannerCreateComponent', () => {
  let component: AdminBannerCreateComponent;
  let fixture: ComponentFixture<AdminBannerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBannerCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBannerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
