import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

export interface IConversationQuery extends NextParsedUrlQuery {
	recipientId: string;
}
