import Image from 'next/image';

type Props = {
	isNewUser: boolean;
};

export const Icon = ({ isNewUser }: Props) =>
	isNewUser ? (
		<Image src="/img/lock.webp" alt="" width={155} height={155} quality={100} />
	) : (
		<Image
			src="/img/neurons/gem2.png"
			alt=""
			width={157}
			height={132}
			quality={100}
		/>
	);
