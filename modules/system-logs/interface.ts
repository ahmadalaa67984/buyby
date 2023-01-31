export interface ISysLog {
  _id: string;
  userId: string;
  action: string;
  user: {
    _id: string;
    email: string;
    name: string;
    address: string;
    phoneNumber: number;
    emailVerified: boolean;
    role: string;
    type: string;
    active: true;
    subscriptionType: string;
    pricing: string;
    registrationNumber: number;
    taxID: string;
    status: string;
    profileStatus: string;
    extraLimit: number;
    price: number;
    receivePromotionalMessagesOrDiscounts: boolean;
  };
}
