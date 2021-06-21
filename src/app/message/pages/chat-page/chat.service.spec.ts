import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgDestroyService } from '@app/core/services';
import { IntervalService } from '@app/message/shared/interval.service';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService, IntervalService, NgDestroyService],
    }),
  );

  it('should be created', () => {
    const service: ChatService = TestBed.inject(ChatService);
    expect(service).toBeTruthy();
  });
});
