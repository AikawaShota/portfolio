import { forwardRef } from "react";

const Profile = forwardRef<HTMLDivElement>(function Profile(_props, ref) {
    return (
        <section ref={ref} className="hero bg-gray-200 min-h-screen">
            <div className="hero-content flex-col gap-10 lg:flex-row">
                <label className="swap swap-flip aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl md:w-96">
                    <input type="checkbox" />
                    <img
                        src="/assets/icons/me.jpg"
                        alt="AikawaShota"
                        className="swap-off h-full w-full object-cover duration-500"
                    />
                    <img
                        src="/assets/icons/penguin.jpg"
                        alt="PenguinIcon"
                        className="swap-on h-full w-full object-cover duration-500"
                    />
                </label>

                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Profile</h1>
                    <div className="py-6">
                        <p className="leading-loose">
                            Webアプリケーションの開発をしています。<br></br>
                            フロントエンド・バックエンド・インフラなど技術の幅を持ったエンジニアを目指しています。<br></br>
                            <span className="mt-2 block">趣味は将棋と麻雀。読みが外れることもありますが運と戦略で何とかしています。</span>
                        </p>
                    </div>
                    <div className="flex max-w-md flex-wrap gap-3">
                        <a
                            href="https://github.com/AikawaShota/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline text-lg">
                            GitHub
                        </a>
                        <a
                            href="https://x.com/aikawa_shota"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline text-2xl">
                            𝕏
                        </a>
                    </div>
                </div>
            </div>
        </section >
    )
});

export default Profile;
