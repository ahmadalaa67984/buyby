export interface IEntity {
  _id: string;
  userId: string;
  userName: string;
  stockitemData: {
    title: string;
    body: string;
    imageUrl: string;
  };
  isRead: boolean;
  allCustomers: boolean;
  allBusinessOwners: boolean;
}
