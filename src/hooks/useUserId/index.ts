import { useSelector } from '../../store';
import { getUserId } from '../../store/auth/authSlice';

export const useUserId = () => useSelector(getUserId);
