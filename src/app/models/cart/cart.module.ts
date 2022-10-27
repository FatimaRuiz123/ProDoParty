export interface Cart {
  IdCustomer: number,
	Products: [
			{
				_id: string,
				IdProduct: string,
				Amount: number
			}
		]
} 
