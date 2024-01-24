import { useEffect, useState } from 'react';

export const useTimer = (active: boolean, ms = 1000) => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		if (!active) return;

		const timer = setInterval(() => setTime((time) => time + ms), ms);

		return () => {
			clearInterval(timer);
			setTime(0);
		};
	}, [active, ms]);

	return time;
};
