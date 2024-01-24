import { interestsKeys } from '~constants/interests';

export type TUserInfo = {
	id: string;
	'registration-date': string;
	name: string;
	isVerified: boolean;
	isSubscriber: boolean;
	gender: TGender;
	birthday: string;
	country: string;
	city: string;
	languages: string[];
	presence: number;
	tags: string[];
	realm: string;
	timezone: number;
	pronouns: string[];
};

export type TUserTags = string[];

export type TUserExperiments = string[];

export type TAppConfig = {
	friend: {
		dbId: number;
		clientId: number;
	};
};

export type TGender = 'fem' | 'mal' | 'other';

export type TBotInterests = (typeof interestsKeys)[number][];
export type TBotInfo = {
	gender: TGender;
	name: string;
	birthday: string;
	ethnicity?: string;
	personality: 'flirty' | 'friendly';
	interests?: TBotInterests;
};
export type TBotIntroSlide = {
	id: number;
	info: string;
	nextButton: string;
	showCancelButton: boolean;
	title: string;
};
export type TBotIntroSlides = Record<string, { slides: TBotIntroSlide[] }>;

export type TUserLevel = {
	currentPoints: number;
	level: number;
	nextLevelPoints: number;
} | null;
