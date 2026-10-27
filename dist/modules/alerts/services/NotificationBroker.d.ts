import type { AlertNotificationDto } from "../dto/AlertDto.js";
type NotificationListener = (notification: AlertNotificationDto) => void;
export declare class NotificationBroker {
    private readonly listeners;
    subscribe(userId: string, listener: NotificationListener): () => void;
    publish(userId: string, notification: AlertNotificationDto): void;
}
export declare const notificationBroker: NotificationBroker;
export {};
