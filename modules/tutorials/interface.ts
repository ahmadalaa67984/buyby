export interface ITutorial {
  _id: string;
  userId: string;
  userName: string;
  tutorialData: {
    title: string;
    body: string;
    imageUrl: string;
  };
  isRead: boolean;
  allCustomers: boolean;
  allBusinessOwners: boolean;
}
