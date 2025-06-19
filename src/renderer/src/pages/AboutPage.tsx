import React from 'react'

export default function AboutPage(): React.JSX.Element {
  return (
    // ナビバーなどと並ぶ場合、親は flex-1 を使用
    <div className="flex-1 bg-base-200 flex items-center justify-center p-4">
      <div className="card shadow-xl bg-base-100 w-full h-auto max-w-3xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold">StorageDeck</h1>
          <h2 className="text-2xl font-semibold mt-4">使用方法</h2>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Cloudflareのアカウントを作成</li>
            <li>R2の登録をする</li>
            <li>Settingページでクレデンシャルの設定をする</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
