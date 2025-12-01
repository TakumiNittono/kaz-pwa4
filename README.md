# Next.js PWA with OneSignal

Next.js 14 (App Router) + TypeScript + PWA + OneSignal を使用した堅牢な特典アプリです。

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の内容を追加してください：

```env
NEXT_PUBLIC_ONESIGNAL_APP_ID=your-onesignal-app-id-here
```

OneSignal App IDは、[OneSignalダッシュボード](https://app.onesignal.com/)から取得できます。

### 3. OneSignalSDKWorker.jsの配置

**重要**: OneSignalを動作させるためには、`OneSignalSDKWorker.js` ファイルを `public` フォルダに配置する必要があります。

#### 自動セットアップ（推奨）：

```bash
npm run setup:onesignal
```

このコマンドで、`OneSignalSDKWorker.js` が自動的にダウンロードされ、`public` フォルダに配置されます。

#### 手動セットアップ：

1. [OneSignal SDK ダウンロードページ](https://github.com/OneSignal/OneSignal-Website-SDK) にアクセス
2. または、以下のコマンドで直接ダウンロード：

```bash
cd public
curl -O https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js
mv OneSignalSDK.page.js OneSignalSDKWorker.js
```

3. `public/OneSignalSDKWorker.js` が存在することを確認してください。

**注意**: ファイル名は正確に `OneSignalSDKWorker.js` である必要があります。

詳細は `ONESIGNAL_SETUP.md` を参照してください。

### 4. PWAアイコンの準備

`public` フォルダに以下のアイコンファイルを配置してください：

- `icon-192x192.png` (192x192ピクセル)
- `icon-512x512.png` (512x512ピクセル)

これらのアイコンは、PWAとしてインストールされた際に使用されます。

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 6. 本番ビルド

```bash
npm run build
npm start
```

## アプリの動作フロー

1. **ブラウザでアクセス時**: ホーム画面に追加するよう案内が表示されます（iOS/Android対応）
2. **PWAとして起動時（通知未許可）**: 通知を許可するボタンが表示されます
3. **PWAとして起動時（通知許可済み）**: 「Free Session Start」ボタンが表示され、クリックで特典サイトへ遷移します

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **PWA**: @ducanh2912/next-pwa
- **Push Notifications**: react-onesignal
- **Styling**: Tailwind CSS
- **Icons**: lucide-react

## トラブルシューティング

### OneSignalが初期化されない場合

- `.env.local` ファイルに `NEXT_PUBLIC_ONESIGNAL_APP_ID` が正しく設定されているか確認してください
- `public/OneSignalSDKWorker.js` が存在するか確認してください
- ブラウザのコンソールでエラーメッセージを確認してください

### PWAがインストールできない場合

- `manifest.json` が正しく配置されているか確認してください
- HTTPSでアクセスしているか確認してください（localhostは開発時のみ例外）
- ブラウザがPWAをサポートしているか確認してください

### 通知が許可されない場合

- ブラウザの通知設定を確認してください
- OneSignalの設定が正しいか確認してください
- 開発環境では `allowLocalhostAsSecureOrigin: true` が設定されていることを確認してください

## ライセンス

MIT

