#!/bin/bash

# OneSignalSDKWorker.jsをダウンロードするスクリプト

echo "OneSignalSDKWorker.jsをダウンロードしています..."

cd public

# OneSignal SDKをダウンロード
curl -L -o OneSignalSDKWorker.js https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js

if [ -f "OneSignalSDKWorker.js" ]; then
    echo "✓ OneSignalSDKWorker.jsが正常にダウンロードされました"
    echo "  場所: public/OneSignalSDKWorker.js"
else
    echo "✗ ダウンロードに失敗しました"
    exit 1
fi

cd ..

echo ""
echo "セットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. .env.localファイルを作成し、NEXT_PUBLIC_ONESIGNAL_APP_IDを設定してください"
echo "2. public/icon-192x192.png と public/icon-512x512.png を配置してください"
echo "3. npm run dev で開発サーバーを起動してください"

