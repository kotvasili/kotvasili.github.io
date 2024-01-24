import { HeaderContainer, PremiumText } from '~components/Header/Header.styles';
import { IconButton } from '~components/IconButton';
import { MenuModal } from '~components/Modals/MenuModal';
import { SubscriptionToggle } from '~components/SubscriptionToggle';
import { CheckoutReason } from '~constants/annals';
import { usePayWallContext } from '~context/paywall';
import { useModal } from '~hooks/useModal';

import Menu from '../../../public/assets/icons/menu.svg';
import Logo from '../../../public/assets/logo.svg';

type Props = {
	botClientId?: number | string;
};

export const Header = ({ botClientId }: Props) => {
	const { open, isOpen, close } = useModal();
	const { hasSubscription } = usePayWallContext();
	return (
		<>
			<HeaderContainer>
				<IconButton background iconSize={40} onClick={open()}>
					<Menu />
				</IconButton>
				<Logo />
				{hasSubscription ? (
					<PremiumText size="small">Premium</PremiumText>
				) : (
					<SubscriptionToggle
						checkoutReason={CheckoutReason.Chat}
						botClientId={botClientId}
					/>
				)}
			</HeaderContainer>
			<MenuModal onClose={close} open={isOpen} locked={false} />
		</>
	);
};
