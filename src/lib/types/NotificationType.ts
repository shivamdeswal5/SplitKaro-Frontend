export type NotificationType = "group" | "expense" | "settlement";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}