import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

import { useAtom } from 'jotai';
import { userInfoAtom, loadingAtom } from '../atoms';

export default function AuthWrapper({ children }) {
  const [userInfo] = useAtom(userInfoAtom);
  const [isLoading] = useAtom(loadingAtom);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAppGroup = segments[0] === '(app)';
    const inSetupUsername = segments[2] === 'setupUsername';

    if (!inAppGroup) {
      router.replace('/(app)/home');
    } else if (userInfo && !userInfo.username && !inSetupUsername) {
      router.replace('/(app)/home/setupUsername');
    }
  }, [userInfo, isLoading, segments, router]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
