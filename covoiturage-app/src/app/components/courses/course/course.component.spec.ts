import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getDuration', () => {
    it('should return the correct duration in hours and minutes', () => {
      const departureDate = new Date('2023-10-01T08:00:00');
      const arrivalDate = new Date('2023-10-01T10:30:00');
      const duration = component.getDuration(departureDate, arrivalDate);
      expect(duration).toBe('2h 30m');
    });

    it('should return 0h 0m for the same departure and arrival time', () => {
      const departureDate = new Date('2023-10-01T08:00:00');
      const arrivalDate = new Date('2023-10-01T08:00:00');
      const duration = component.getDuration(departureDate, arrivalDate);
      expect(duration).toBe('0h 0m');
    });

    it('should handle durations less than an hour correctly', () => {
      const departureDate = new Date('2023-10-01T08:00:00');
      const arrivalDate = new Date('2023-10-01T08:45:00');
      const duration = component.getDuration(departureDate, arrivalDate);
      expect(duration).toBe('0h 45m');
    });

    it('should handle durations more than a day correctly', () => {
      const departureDate = new Date('2023-10-01T08:00:00');
      const arrivalDate = new Date('2023-10-02T10:30:00');
      const duration = component.getDuration(departureDate, arrivalDate);
      expect(duration).toBe('26h 30m');
    });
  });
});