export interface Order {
  Status: string;
  FullNameUser: string;
  Paid: boolean;
  Latitude: number;
  Lenght: number;
  DateDeliver: string;
  DateReturn: string;
  Products: [
    {
      _id?: string;
      IdProducts: string;
      Amount: number;
    }
  ];
}
