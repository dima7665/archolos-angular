export interface SelectOption<T = number> {
	key: T;
	text: string;
}

export interface SelectOptionBackend {
	id: number;
	name: string;
}
