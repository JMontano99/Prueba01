import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { concat, of, throwError } from 'rxjs';
import {
  SseEventType,
  SseService,
  SseEvent,
} from 'src/app/services/sse.service';
import { environment } from 'src/environments/environment';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let sseServiceSpy: jasmine.SpyObj<SseService>;

  beforeEach(async () => {
    sseServiceSpy = jasmine.createSpyObj('SseService', [
      'getServerSentEvent',
      'stopManually',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        EventsComponent,
      ],
      providers: [
        {
          provide: SseService,
          useValue: sseServiceSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should start listening sse and receive event', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return concat(
        of({
          type: SseEventType.connectionUp,
        }),
        of({
          type: SseEventType.data,
          data: 'hello',
        })
      );
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.formEvents?.patchValue({
      id: 1,
      channel: 'test',
    });
    component.listen();

    expect(
      component.results.includes('Connections to the server established...')
    ).toBeTruthy();
    expect(component.results.includes('hello')).toBeTruthy();
  });

  it('should not start listening', () => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.listening = true;
    component.formEvents?.patchValue({
      id: 1,
      channel: 'test',
    });
    component.listen();
    expect(sseServiceSpy.getServerSentEvent).not.toHaveBeenCalled();
  });

  it('should start listening and get connection down', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return of({
        type: SseEventType.connectionDown,
      });
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.formEvents?.patchValue({
      id: 1,
      channel: 'test',
    });
    component.listen();

    expect(
      component.results.includes('Listening to server events stopped')
    ).toBeTrue();
  });

  it('should start listening and not recieve anything', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return of({
        type: -1,
      } as SseEvent);
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.listen();

    expect(component.results.length).toBe(0);
  });

  it('should start listening and get error', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return throwError(() => {
        return { errorCode: 500 };
      });
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.listen();

    expect(component.results.includes('500')).toBeTrue();
  });

  it('should start listening and get NO error', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return throwError(() => null);
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.listen();

    expect(component.results).toBe('\nError ...');
  });

  it('should start listening and get reconnecting', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return of({
        type: 2,
      });
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.listen();

    expect(component.results.includes('Reconnecting')).toBeTrue();
  });

  it('should stop listening', () => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.stop();

    expect(component.listening).toBeFalse();
    expect(sseServiceSpy.stopManually).toHaveBeenCalled();
    expect(
      component.results.includes('Listening to server events stopped')
    ).toBeTrue();
  });

  it('should call sse with no form', () => {
    sseServiceSpy.getServerSentEvent.and.callFake(() => {
      return of({
        type: -1,
      } as SseEvent);
    });

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.formEvents = undefined;
    component.listen();

    expect(sseServiceSpy.getServerSentEvent).toHaveBeenCalledWith(
      `${environment.sse.url}/subscribe/undefined/undefined`
    );
  });
});
