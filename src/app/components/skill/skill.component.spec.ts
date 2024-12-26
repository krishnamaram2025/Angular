import { ComponentFixture, TestBed } from '@angular/core/testing';

import { skillComponent } from './skill.component';

describe('skillComponent', () => {
  let component: skillComponent;
  let fixture: ComponentFixture<skillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [skillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(skillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
