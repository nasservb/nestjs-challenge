import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/usersCreate.event';

@Injectable()
export class UserCreatedListener {
  @OnEvent('users.created')
  handleOrderCreatedEvent(event: UserCreatedEvent) {
    // handle send email logic
    console.log(event);
  }
}
