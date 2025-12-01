'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export function OneSignalInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initOneSignal = async () => {
      try {
        const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
        if (!appId) {
          console.warn('OneSignal App ID is not set. Please set NEXT_PUBLIC_ONESIGNAL_APP_ID in your .env.local file.');
          return;
        }

        // OneSignalの初期化
        OneSignal.initialize(appId, {
          allowLocalhostAsSecureOrigin: true,
        });

        // グローバルにOneSignalインスタンスを公開（他のコンポーネントからアクセス可能にする）
        (window as any).OneSignal = OneSignal;

        console.log('OneSignal initialized successfully');
      } catch (error) {
        console.error('OneSignal initialization error:', error);
      }
    };

    initOneSignal();
  }, []);

  return null;
}

