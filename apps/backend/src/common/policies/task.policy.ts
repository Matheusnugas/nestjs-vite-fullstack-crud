import { ForbiddenException } from '@nestjs/common';

export class TaskPolicy {
  static assertOwnership(resourceUserId: number, currentUserId: number) {
    if (resourceUserId !== currentUserId) {
      throw new ForbiddenException('You do not own this task');
    }
  }
}
