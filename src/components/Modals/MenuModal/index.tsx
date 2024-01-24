import { FC, useCallback, useEffect, useState } from 'react';

import { EmailConfirm } from '~components/EmailConfirm';
import { IconButton } from '~components/IconButton';
import {
	MenuContent,
	MenuHeader,
	MenuLink,
} from '~components/Modals/MenuModal/MenuModal.styles';
import { TModalProps } from '~components/Modals/types';
import { SubscriptionToggle } from '~components/SubscriptionToggle';
import { CheckoutReason } from '~constants/annals';
import { usePayWallActionsContext, usePayWallContext } from '~context/paywall';
import { withHover } from '~theme/snippets';

import ArrowBack from '../../../../public/assets/icons/arrowBack.svg';
import Close from '../../../../public/assets/icons/close.svg';
import Logo from '../../../../public/assets/Logo.svg';
import { UserInfo } from '../../UserSettings/UserInfo';
import { UserSubscriptions } from '../../UserSettings/UserSubscriptions';
import { Modal } from '../Base';

const PayButtons = () => {
	const { balance, hasSubscription } = usePayWallContext();
	const { openSubscription, openNeurons } = usePayWallActionsContext();
	return (
		<>
			<MenuLink
				className={withHover}
				onClick={openNeurons({ checkoutReason: CheckoutReason.Menu })}
			>
				<p>
					Add Neurons &nbsp;<span>{balance}</span>
				</p>
			</MenuLink>
			{hasSubscription ? null : (
				<MenuLink
					className={withHover}
					onClick={openSubscription({ checkoutReason: CheckoutReason.Menu })}
				>
					<p>EVA AI Premium</p>
					<SubscriptionToggle checkoutReason={CheckoutReason.Menu} />
				</MenuLink>
			)}
		</>
	);
};
const MainContent: FC<{
	toggleInfo: () => void;
	toggleSubscriptions: () => void;
}> = ({ toggleInfo, toggleSubscriptions }) => {
	return (
		<>
			<MenuLink className={withHover} onClick={toggleInfo}>
				<p>My profile</p>
			</MenuLink>
			<PayButtons />
			<MenuLink className={withHover} onClick={toggleSubscriptions}>
				<p>My Subscriptions</p>
			</MenuLink>
			<EmailConfirm />
		</>
	);
};

type TSection = 'main' | 'info' | 'subscription';

const effect = {
	hidden: {
		x: 'min(-300px, -50vw)',
	},
	visible: {
		x: '0',
		transition: {
			ease: 'easeInOut',
			duration: 0.25,
		},
	},
	exit: {
		x: 'min(-300px, -50vw)',
		transition: {
			ease: 'easeInOut',
			duration: 0.15,
		},
	},
};

export const MenuModal: FC<TModalProps> = ({ open, locked, onClose }) => {
	const [activeSection, setActiveSection] = useState<TSection>('main');
	const setMainSection = useCallback(() => setActiveSection('main'), []);
	const setInfoSection = useCallback(() => setActiveSection('info'), []);
	const setSubscriptionSection = useCallback(
		() => setActiveSection('subscription'),
		[]
	);
	useEffect(() => {
		if (open) {
			setMainSection();
		}
	}, [open, setMainSection]);
	return (
		<Modal open={open} locked={locked} onClose={onClose}>
			<MenuContent
				variants={effect}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<MenuHeader>
					{activeSection !== 'main' ? (
						<IconButton onClick={setMainSection} text={'Back'}>
							<ArrowBack />
						</IconButton>
					) : (
						<Logo />
					)}
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
				</MenuHeader>
				{activeSection === 'main' && (
					<MainContent
						toggleInfo={setInfoSection}
						toggleSubscriptions={setSubscriptionSection}
					/>
				)}
				{activeSection === 'info' && <UserInfo onClose={onClose} />}
				{activeSection === 'subscription' && <UserSubscriptions />}
			</MenuContent>
		</Modal>
	);
};
