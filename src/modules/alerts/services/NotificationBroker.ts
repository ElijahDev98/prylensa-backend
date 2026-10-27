import type { AlertNotificationDto } from "../dto/AlertDto.js";

type NotificationListener = (notification: AlertNotificationDto) => void;

export class NotificationBroker {
  private readonly listeners = new Map<string, Set<NotificationListener>>();

  public subscribe(userId: string, listener: NotificationListener): () => void {
    const userListeners = this.listeners.get(userId) ?? new Set();
    userListeners.add(listener);
    this.listeners.set(userId, userListeners);

    return () => {
      userListeners.delete(listener);
      if (userListeners.size === 0) this.listeners.delete(userId);
    };
  }

  public publish(userId: string, notification: AlertNotificationDto): void {
    for (const listener of this.listeners.get(userId) ?? []) {
      listener(notification);
    }
  }
}

export const notificationBroker = new NotificationBroker();
