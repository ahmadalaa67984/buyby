export interface ICustomer {
  _id: string;
  email: string;
  name: string;
  address: string;
  phoneNumber: number;
  emailVerified: boolean;
  role: string;
  type: string;
  status: string;
  active: boolean;
  subscriptionType: string;
  profileStatus: string;
  receivePromotionalMessagesOrDiscounts: boolean;
  taxID: string;
  registrationNumber: string;
}
