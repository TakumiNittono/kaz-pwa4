# OneSignalSDKWorker.js の配置手順

## 概要

OneSignalを動作させるためには、`OneSignalSDKWorker.js` ファイルを `public` フォルダに配置する必要があります。

## 配置方法

### 方法1: 直接ダウンロード（推奨）

ターミナルで以下のコマンドを実行してください：

```bash
cd public
curl -O https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js
mv OneSignalSDK.page.js OneSignalSDKWorker.js
cd ..
```

### 方法2: 手動ダウンロード

1. ブラウザで以下のURLを開く：
   ```
   https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js
   ```

2. ページの内容をすべてコピー

3. `public/OneSignalSDKWorker.js` という名前でファイルを作成

4. コピーした内容を貼り付け

### 方法3: GitHubから取得

1. [OneSignal Web SDK リポジトリ](https://github.com/OneSignal/OneSignal-Website-SDK) にアクセス

2. 最新のリリースから `OneSignalSDK.page.js` をダウンロード

3. `public` フォルダに `OneSignalSDKWorker.js` という名前で配置

## ファイル配置後の確認

配置後、以下の構造になっていることを確認してください：

```
kaz-pwa4/
├── public/
│   ├── OneSignalSDKWorker.js  ← このファイルが存在すること
│   ├── manifest.json
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── app/
├── components/
└── ...
```

## 重要な注意事項

1. **ファイル名は正確に**: `OneSignalSDKWorker.js` という名前でなければ動作しません
2. **配置場所**: `public` フォルダの直下に配置してください（サブフォルダには配置しない）
3. **バージョン**: 最新のSDKバージョンを使用することを推奨します

## 動作確認

ファイルを配置した後、開発サーバーを起動してブラウザのコンソールを確認してください：

```bash
npm run dev
```

コンソールに「OneSignal initialized successfully」と表示されれば、正常に動作しています。

## トラブルシューティング

### 404エラーが発生する場合

- ファイル名が正確か確認してください（大文字小文字も含む）
- `public` フォルダの直下に配置されているか確認してください
- 開発サーバーを再起動してください

### OneSignalが初期化されない場合

- ブラウザのコンソールでエラーメッセージを確認してください
- `.env.local` に `NEXT_PUBLIC_ONESIGNAL_APP_ID` が設定されているか確認してください

