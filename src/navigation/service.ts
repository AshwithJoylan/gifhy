import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * Dispatch an action or an update function to the router.
 * The update function will receive the current state,
 *
 * @param action Action object or update function.
 */
export const dispatch = (action: any) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(action);
  }
};

/**
 * Navigate to a route in current navigation tree.
 *
 * @param name Name of the route to navigate to.
 * @param [params] Params object for the route.
 */
export const navigate = (screen: string, params: object) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.navigate(screen as never, params as never);
  }
};

/**
 * Go back to the previous route in history.
 */
export const goBack = () => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.goBack();
  }
};

/**
 * Replace the current screen with new screen
 */
export const replace = (name: string, params?: object) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(StackActions.replace(name, params));
  }
};
