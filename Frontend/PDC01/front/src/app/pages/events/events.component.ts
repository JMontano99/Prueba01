import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  SseEvent,
  SseEventType,
  SseService,
} from 'src/app/services/sse.service';
import { environment } from 'src/environments/environment';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    NgIf,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
  ],
})
export class EventsComponent {
  formEvents: FormGroup | undefined;
  results = '';
  listening = false;

  constructor(private fb: FormBuilder, private sse: SseService) {
    this.formEvents = this.fb.group({
      id: ['1', Validators.required],
      channel: ['news', Validators.required],
    });
  }

  listen(): void {
    if (this.listening) {
      return;
    }

    this.listening = true;

    this.sse
      .getServerSentEvent(
        `${environment.sse.url}/subscribe/${
          this.formEvents?.get('id')?.value
        }/${this.formEvents?.get('channel')?.value}`
      )
      .subscribe({
        next: (event: SseEvent) => {
          switch (event.type) {
            case SseEventType.connectionUp:
              this.results += '\nConnections to the server established...';
              break;
            case SseEventType.data:
              this.results += `\n${event.data}`;
              break;
            case SseEventType.reconnecting:
              this.results += '\nReconnecting...';
              break;
            case SseEventType.connectionDown:
              this.results += '\nListening to server events stopped...';
              break;
            default:
              break;
          }
        },
        error: (err?) => {
          this.listening = false;
          this.results += `\nError ${err?.errorCode ?? ''}...`;
        },
      });
  }

  stop(): void {
    this.sse.stopManually();
    this.listening = false;
    this.results += '\nListening to server events stopped...';
  }
}
