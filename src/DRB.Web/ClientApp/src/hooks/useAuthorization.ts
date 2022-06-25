import { User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { useEffect, useState } from 'react';

export const useAuthorization = () => {
  const [userManager, setUserManager] = useState<UserManager>();
  const [user, setUser] = useState<User>();

  // Create a user manager when the hook is initiated
  useEffect(() => {
    fetch('/Auth/_configuration/DRB.Web').then(async (response) => {
      const settings = await response.json();
      settings.automaticSilentRenew = true;
      settings.includeIdTokenInSilentRenew = true;
      settings.userStore = new WebStorageStateStore({
        prefix: 'DRB.Web',
      });

      setUserManager(new UserManager(settings));
    });
  }, []);

  // Get the user when user manager is initiated
  // useEffect(() => {
  //   if (userManager) {
  //     userManager.getUser().then((user) => {
  //       setUser(user ?? undefined);
  //       console.log(user);
  //     });
  //   }
  // }, [userManager]);

  return [userManager];
};
