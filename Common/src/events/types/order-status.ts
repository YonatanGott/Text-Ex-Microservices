export enum OrderStatus {
	// When the order has been created, but the
	// book it is trying to order has not been reserved
	Created = "created",

	// The book the order is trying to reserve has already
	// been reserved, or when the user has cancelled the order.
	// The order expires before payment
	Cancelled = "cancelled",

	// The order has successfully reserved the book
	AwaitingPayment = "awaiting:payment",

	// The order has reserved the book and the user has
	// provided payment successfully
	Complete = "complete",
}
