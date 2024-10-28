export default function Profile() {
    const handleRedirect = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="/images/ID_photo.JPG"
                    className="max-w-sm rounded-3xl shadow-2xl" />
                <div className='max-w-lg'>
                    <h1 className="text-5xl font-bold">Profile</h1>
                    <p className="py-6 leading-loose">
                        Webアプリ開発を学ぶ学生です。
                        フロントエンドからバックエンドまで対応できるフルスタックエンジニアを目指しています。
                        開発中はどうすれば楽ができるかをずっと考えています。
                        趣味は麻雀と将棋。読みが外れることもありますが、運と戦略で何とかしています。
                    </p>
                    <div className="flex justify-between max-w-56">
                        <button
                            onClick={() => handleRedirect('https://mesekit.com/')}
                            className="btn btn-outline">
                            Blog
                        </button>
                        <button
                            onClick={() => handleRedirect('https://github.com/AikawaShota/')}
                            className="btn btn-outline">
                            GitHub
                        </button>
                        <button
                            onClick={() => handleRedirect('https://x.com/aikawa_shota')}
                            className="btn btn-outline">
                            𝕏
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
