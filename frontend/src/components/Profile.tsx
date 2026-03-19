import { forwardRef } from "react";

const Profile = forwardRef<HTMLDivElement>(function Profile(_props, ref) {
    return (
        <section ref={ref} className="hero bg-gray-200 min-h-screen">
            <div className="hero-content flex-col gap-10 lg:flex-row">
                <img
                    src="/images/ID_photo.JPG"
                    alt="AikawaShota"
                    className="max-w-sm rounded-3xl shadow-2xl"
                />
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Profile</h1>
                    <p className="py-6 leading-loose">
                        Webアプリ開発を学ぶ学生です。
                        フロントエンドからバックエンドまで対応できるフルスタックエンジニアを目指しています。
                        開発中はどうすれば楽ができるかをずっと考えています。
                        趣味は麻雀と将棋。読みが外れることもありますが、運と戦略で何とかしています。
                    </p>
                    <div className="flex max-w-md flex-wrap gap-3">
                        <a
                            href="https://mesekit.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline">
                            Blog
                        </a>
                        <a
                            href="https://github.com/AikawaShota/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline">
                            GitHub
                        </a>
                        <a
                            href="https://x.com/aikawa_shota"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline">
                            𝕏
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
});

export default Profile;
