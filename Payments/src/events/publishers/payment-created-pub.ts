import { Subjects, Publisher, PaymentCreatedEvent } from "@keshetanan/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
