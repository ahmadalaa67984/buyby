export interface INotification {
  _id: string;
  userId: string;
  userName: string;
  notificationData: {
    title: string;
    body: string;
    imageUrl: string;
  };
  isRead: boolean;
  allCustomers: boolean;
  allBusinessOwners: boolean;
}
