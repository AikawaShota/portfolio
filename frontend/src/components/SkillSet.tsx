import { forwardRef } from "react";

interface SkillData {
    id: string;
    title: string;
    rating: number;
    description: string;
    experience: string;
}

interface SkillCategory {
    title: string;
    skills: SkillData[];
}

interface CertificationData {
    id: string;
    title: string;
}

const skillCategories: SkillCategory[] = [
    {
        title: "Language",
        skills: [
            {
                id: "typescript",
                title: "TypeScript",
                rating: 2,
                description: "フロントエンド・サーバーサイド両方の開発で利用しています。",
                experience: "3年(業務, 個人開発)"
            },
            {
                id: "python",
                title: "Python",
                rating: 1,
                description: "小規模なスクリプト用途で利用。本格的なアプリ開発やデータ分析の経験はありません。",
                experience: "3年(個人開発, スクリプト用途での業務利用)"
            },
            {
                id: "go",
                title: "Go",
                rating: 0.5,
                description: "Restful APIの開発に利用しています。現在勉強中です。",
                experience: "1年(Getting Startedレベルの個人開発)"
            },
            {
                id: "java",
                title: "Java",
                rating: 0.5,
                description: "Java+Servletで簡単なWebアプリケーション開発を学びました。",
                experience: "1年(Getting Startedレベルの個人開発)"
            },
            {
                id: "sql",
                title: "SQL",
                rating: 1,
                description: "RDBのスキーマ定義・CRUDの操作など。大規模DBの運用や本格的なクエリチューニングの経験はありません。",
                experience: "4年(業務, 個人開発)"
            },
        ],
    },
    {
        title: "Framework & Library",
        skills: [
            {
                id: "nextjs",
                title: "Next.js",
                rating: 2,
                description: "App Routerを利用したAPI開発・MUIを利用したフロントエンド開発に利用。",
                experience: "1年(業務, 個人開発)"
            },
            {
                id: "django",
                title: "Django",
                rating: 1,
                description: "クラスベースビュー・関数ベースビューを利用したWebアプリ開発に利用。",
                experience: "1年(個人開発)"
            },
            {
                id: "sqlc",
                title: "SQLC",
                rating: 1,
                description: "ORMの代替として利用。",
                experience: "1年(業務)"
            },
        ],
    },
    {
        title: "Infrastructure",
        skills: [
            {
                id: "aws",
                title: "AWS",
                rating: 1,
                description: "EKS, RDS, S3などのサービスを業務で利用。ちなみに本サイトはS3 + CloudFrontの構成で配信されています。",
                experience: "1年(業務, 個人開発)"
            },
            {
                id: "cloudflare",
                title: "Cloudflare",
                rating: 0.5,
                description: "ドメインレジストラ・DNSサーバーとして利用。このサイトもCloudflare Registrarで登録したドメインを利用しています。",
                experience: "3年(個人開発)"
            },
            {
                id: "terraform",
                title: "Terraform",
                rating: 1,
                description: "IaCツールとして利用。AWS Provider以外は使ったことがありません。",
                experience: "1年(業務, 個人開発)"
            },
            {
                id: "kubernetes",
                title: "Kubernetes",
                rating: 0.5,
                description: "Helmfileを業務利用。ServiceAccountを利用したEKS外のサービスとの連携など。",
                experience: "1年(業務)"
            },
        ],
    },
    {
        title: "Tools",
        skills: [
            {
                id: "metabase",
                title: "Metabase",
                rating: 1,
                description: "データ可視化ツールとして利用。",
                experience: "1年(業務)"
            },
        ],
    },
];

const certifications: CertificationData[] = [
    {
        id: "fe",
        title: "基本情報技術者試験 合格",
    },
];

const SkillSet = forwardRef<HTMLDivElement>(function SkillSet(_props, skillRef) {
    return (
        <section ref={skillRef} className="w-full min-h-screen bg-gray-50 py-10">
            <div className="md:w-9/12 mx-auto md:px-0 px-5">
                <h1 className="text-5xl font-bold">Skill</h1>
                {skillCategories.map((category) => (
                    <div key={category.title}>
                        <h2 className="font-bold text-3xl py-4">{category.title}</h2>
                        <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                            {category.skills.length > 0 ? (
                                category.skills.map((skill) => (
                                    <SkillItem
                                        key={skill.id}
                                        {...skill}
                                    />
                                ))
                            ) : (
                                <p className="w-full text-gray-400">Coming Soon</p>
                            )}
                        </div>
                    </div>
                ))}
                <div className="mt-12">
                    <h2 className="font-bold text-3xl py-4">Certifications</h2>
                    <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                        {certifications.map((certification) => (
                            <CertificationItem
                                key={certification.id}
                                {...certification}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
});

function SkillItem({ title, rating, description, experience }: SkillData) {
    return (
        <div className="w-full">
            <article className="h-full rounded-box border border-base-300 bg-base-100 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <RatingStar rating={rating} />
                </div>
                <p className="mt-4 leading-relaxed">{description}</p>
                <p className="mt-4 text-sm text-gray-500">
                    Experience: {experience}
                </p>
            </article>
        </div>
    )
}

function CertificationItem({ title }: CertificationData) {
    return (
        <div className="w-full">
            <article className="h-full rounded-box border border-base-300 bg-base-100 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md">
                <h3 className="font-bold text-lg">{title}</h3>
            </article>
        </div>
    );
}

function RatingStar({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
        <div className="rating rating-sm">
            {[...Array(5)].map((_, index) => {
                const isFullStar = index < fullStars;
                const isHalfStar = index === fullStars && hasHalfStar;

                if (isHalfStar) {
                    return (
                        <div key={index} className="relative h-6 w-6">
                            <span className="mask mask-star-2 absolute inset-0 h-6 w-6 bg-gray-300" />
                            <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                                <span className="mask mask-star-2 absolute inset-0 h-6 w-6 bg-black" />
                            </span>
                        </div>
                    );
                }

                return (
                    <span
                        key={index}
                        className={`mask mask-star-2 h-6 w-6 ${isFullStar ? "bg-black" : "bg-gray-300"}`}
                    />
                );
            })}
        </div>
    )
}

export default SkillSet;
