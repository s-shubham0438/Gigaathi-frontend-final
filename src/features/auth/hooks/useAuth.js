import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  registerUser,
  logoutUser,
  switchRoleDirectly,
  clearAuthError,
} from '../state/authSlice';
import { showToast } from '../../../shared/state/uiSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, status, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    const resultAction = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(resultAction)) {
      dispatch(showToast({ message: `Welcome back, ${resultAction.payload.user.name}!`, type: 'success' }));
      return resultAction.payload.user;
    } else {
      throw new Error(resultAction.payload || 'Login failed');
    }
  };

  const register = async (payload) => {
    const resultAction = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(resultAction)) {
      dispatch(showToast({ message: `Account created for ${resultAction.payload.user.name}!`, type: 'success' }));
      return resultAction.payload.user;
    } else {
      throw new Error(resultAction.payload || 'Registration failed');
    }
  };

  const logout = async () => {
    await dispatch(logoutUser());
    dispatch(showToast({ message: 'Logged out successfully', type: 'info' }));
  };

  const switchRole = (role) => {
    dispatch(switchRoleDirectly(role));
    dispatch(showToast({ message: `Switched view to ${role} experience`, type: 'info' }));
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  const isCustomer = user?.role === 'CUSTOMER';
  const isWorker = user?.role === 'WORKER';
  const isCooperative = user?.role === 'COOPERATIVE';

  return {
    user,
    isAuthenticated,
    isLoading: status === 'loading',
    error,
    isCustomer,
    isWorker,
    isCooperative,
    login,
    register,
    logout,
    switchRole,
    clearError,
  };
};

export default useAuth;