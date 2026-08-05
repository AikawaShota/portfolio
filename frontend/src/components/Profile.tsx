import { forwardRef } from "react";
import OptimizedImage from "./OptimizedImage";

const Profile = forwardRef<HTMLDivElement>(function Profile(_props, ref) {
    return (
        <section ref={ref} className="hero bg-gray-200 min-h-screen">
            <div className="hero-content flex-col gap-10 lg:flex-row">
                <label className="swap swap-flip aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl md:w-96">
                    <input type="checkbox" />
                    <OptimizedImage
                        src="/assets/icons/me.jpg"
                        alt="AikawaShota"
                        pictureClassName="swap-off h-full w-full"
                        className="h-full w-full object-cover duration-500"
                    />
                    <OptimizedImage
                        src="/assets/icons/penguin.jpg"
                        alt="PenguinIcon"
                        pictureClassName="swap-on h-full w-full"
                        className="h-full w-full object-cover duration-500"
                    />
                </label>

                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Profile</h1>

                    <div className="mt-8">
                        <p className="text-2xl font-bold">
                            相川祥太
                            <span className="ml-3 text-base font-normal text-gray-500">
                                AikawaShota
                            </span>
                        </p>

                        <p className="mt-2 text-lg font-medium text-primary">
                            Web Developer / Engineer
                        </p>

                        <p className="mt-4 leading-8 text-gray-700">
                            自社サービスのWebアプリケーションを中心に設計・開発・運用まで幅広く携わっています。
                        </p>

                        <p className="mt-4 leading-8 text-gray-700">
                            趣味は将棋・麻雀、そしてサイクリング。読みが外れたら運と戦略で乗り切り、頭を空っぽにしたくなったら自転車でひたすら遠くまで走ります。
                        </p>
                    </div>
                    <div className="mt-5 flex max-w-md flex-wrap gap-3">
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
