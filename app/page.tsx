'use client';

import { useEffect, useState, useCallback } from 'react';
import { Download, Share2, Bell, ExternalLink } from 'lucide-react';
import OneSignal from 'react-onesignal';

type AppPhase = 'browser' | 'app-unsubscribed' | 'app-subscribed' | 'loading';

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  const checkOneSignalSubscription = useCallback(async () => {
    try {
      // OneSignalが初期化されるまで待つ
      let retries = 0;
      const maxRetries = 10;
      
      const checkInit = async () => {
        try {
          const isEnabled = await OneSignal.isPushNotificationsEnabled();
          
          if (isEnabled) {
            setPhase('app-subscribed');
          } else {
            setPhase('app-unsubscribed');
          }
        } catch (error) {
          if (retries < maxRetries) {
            retries++;
            setTimeout(checkInit, 500);
          } else {
            console.error('Error checking OneSignal subscription:', error);
            setPhase('app-unsubscribed');
          }
        }
      };

      checkInit();
    } catch (error) {
      console.error('Error checking OneSignal subscription:', error);
      setPhase('app-unsubscribed');
    }
  }, []);

  useEffect(() => {
    // デバイス判定
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const ios = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const android = /android/i.test(userAgent);

    setIsIOS(ios);
    setIsAndroid(android);

    // Standaloneモードかどうかを判定
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;

    if (!isStandalone) {
      // Phase 1: ブラウザモード
      setPhase('browser');
      return;
    }

    // Phase 2 or 3: アプリモード
    checkOneSignalSubscription();

    // 購読状態を定期的にチェック（状態変更を監視）
    const intervalId = setInterval(() => {
      const isStandaloneCheck = window.matchMedia('(display-mode: standalone)').matches || 
                                (window.navigator as any).standalone === true;
      if (isStandaloneCheck) {
        checkOneSignalSubscription();
      }
    }, 2000); // 2秒ごとにチェック

    return () => {
      clearInterval(intervalId);
    };
  }, [checkOneSignalSubscription]);

  const handleRequestNotification = async () => {
    try {
      // Slidedownプロンプトを表示
      await OneSignal.showSlidedownPrompt();
      
      // 購読状態を再確認（少し待ってから）
      setTimeout(checkOneSignalSubscription, 1000);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      // showSlidedownPromptが失敗した場合、直接登録を試みる
      try {
        await OneSignal.registerForPushNotifications();
        setTimeout(checkOneSignalSubscription, 1000);
      } catch (registerError) {
        console.error('Error registering for push notifications:', registerError);
        alert('通知の許可に失敗しました。ブラウザの設定を確認してください。');
      }
    }
  };

  const handleFreeSessionClick = () => {
    window.location.href = 'https://utage-system.com/p/zwvVkDBzc2wb';
  };

  if (phase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // Phase 1: ブラウザモード - ホーム画面に追加を促す
  if (phase === 'browser') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Download className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ホーム画面に追加してください
            </h1>
            <p className="text-gray-600">
              アプリとしてインストールすると、特典を受け取れます
            </p>
          </div>

          {isIOS ? (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                  iOSの場合
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>画面下部の<strong>共有ボタン</strong>をタップ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>「ホーム画面に追加」を選択</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>「追加」をタップして完了</span>
                  </li>
                </ol>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Share2 className="w-4 h-4" />
                <span>共有ボタン → ホーム画面に追加</span>
              </div>
            </div>
          ) : isAndroid ? (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-green-600" />
                  Androidの場合
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>ブラウザのメニュー（3点リーダー）をタップ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>「ホーム画面に追加」または「アプリをインストール」を選択</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>確認ダイアログで「追加」をタップ</span>
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">
                インストール方法
              </h3>
              <p className="text-sm text-gray-700">
                ブラウザのメニューから「ホーム画面に追加」または「アプリをインストール」を選択してください。
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Phase 2: アプリモード - 通知未許可
  if (phase === 'app-unsubscribed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <Bell className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              特典を受け取る
            </h1>
            <p className="text-gray-600">
              通知を許可して、特別な特典を受け取りましょう
            </p>
          </div>

          <button
            onClick={handleRequestNotification}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Bell className="w-5 h-5" />
            <span>通知を許可して特典を受け取る</span>
          </button>

          <p className="mt-4 text-xs text-gray-500">
            通知を許可すると、最新の特典情報をお届けします
          </p>
        </div>
      </div>
    );
  }

  // Phase 3: アプリモード - 通知許可済み
  if (phase === 'app-subscribed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              通知が有効です
            </h1>
            <p className="text-gray-600">
              特典を受け取る準備ができました
            </p>
          </div>

          <button
            onClick={handleFreeSessionClick}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Free Session Start</span>
          </button>

          <p className="mt-4 text-xs text-gray-500">
            ボタンをタップして特典サイトへ移動します
          </p>
        </div>
      </div>
    );
  }

  return null;
}

