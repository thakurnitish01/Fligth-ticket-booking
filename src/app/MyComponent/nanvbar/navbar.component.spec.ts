import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanvbarComponent } from './nanvbar.component';

describe('NavbarComponent', () => {
  let component: NanvbarComponent;
  let fixture: ComponentFixture<NanvbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NanvbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NanvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
