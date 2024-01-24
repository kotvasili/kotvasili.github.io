export const enum VatType {
	GrossWithoutGst,
	Net,
	Gross,
}

export type TVATRequestBodyItem = {
	amount: number;
	ip: string;
	projectId: string;
	priceType: VatType;
	userId: string;
};

export type TVATResponseItem = {
	gross: number;
	net: number;
	taxAbbreviation: string;
	ip: string;
	tags: {
		TaxZIPCode: string;
		TaxState: string;
		TaxAmount: number;
		TaxAbbreviation: string;
		TaxIp: string;
	};
	tax: number;
};
