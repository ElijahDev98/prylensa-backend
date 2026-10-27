export class NotificationBroker {
    listeners = new Map();
    subscribe(userId, listener) {
        const userListeners = this.listeners.get(userId) ?? new Set();
        userListeners.add(listener);
        this.listeners.set(userId, userListeners);
        return () => {
            userListeners.delete(listener);
            if (userListeners.size === 0)
                this.listeners.delete(userId);
        };
    }
    publish(userId, notification) {
        for (const listener of this.listeners.get(userId) ?? []) {
            listener(notification);
        }
    }
}
export const notificationBroker = new NotificationBroker();
//# sourceMappingURL=NotificationBroker.js.map