import {
	Publisher,
	Subjects,
	ExpirationCompleteEvent,
} from "@keshetanan/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
