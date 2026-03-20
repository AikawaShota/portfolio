import { forwardRef, useState } from "react";

interface WorkItem {
    id: string;
    title: string;
    summary: string;
    imageSrc: string;
    modalImageSrc?: string;
    modalOnlyImages?: {
        src: string;
        alt: string;
    }[];
    href: string;
    stackGroups: {
        title: string;
        items: string[];
    }[];
    sections: {
        title: string;
        description: string;
    }[];
}

const workItems: WorkItem[] = [
    {
        id: "portfolio",
        title: "Portfolio Site",
        summary: "今ご覧になられているポートフォリオサイトです。S3でホストしてCloudfrontから配信しています。",
        imageSrc: "/assets/works/portfolio/portfolio.png",
        modalImageSrc: "/assets/works/portfolio/portfolio.png",
        modalOnlyImages: [
            {
                src: "/assets/works/portfolio/architecture.jpg",
                alt: "アーキテクチャ図"
            }
        ],
        href: "https://github.com/AikawaShota/portfolio",
        stackGroups: [
            {
                title: "Frontend",
                items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "daisyUI"],
            },
            {
                title: "Infrastructure",
                items: ["S3", "CloudFront", "Cloudflare DNS"],
            },
        ],
        sections: [
            {
                title: "Overview",
                description:
                    "PCとモバイルで表現を切り分けながら、読みやすさと遊びの両立を意識して作成しました。PC版トップのThree.jsを使ったインパクトのある表現がお気に入りです。",
            },
            {
                title: "Architecture",
                description:
                    "S3で静的ファイルをホスティングしCloudfrontから配信しています。S3バケットは外部から隠蔽しつつCDNによる通信の最適化とSSL保護を提供しています。",
            },
        ],
    },
];

const Works = forwardRef<HTMLDivElement>(function Works(_props, ref) {
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

    return (
        <section ref={ref} className="w-full min-h-screen bg-gray-200">
            <div className="mx-auto w-full px-5 md:w-9/12 md:px-0">
                <h1 className="pt-10 text-5xl font-bold">Works</h1>
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {workItems.map((work) => (
                        <button
                            key={work.id}
                            type="button"
                            onClick={() => setSelectedWork(work)}
                            className="group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-neutral hover:bg-neutral hover:text-white hover:shadow-md">
                            <div className="flex-1">
                                <div className="aspect-[16/10] overflow-hidden border-b border-base-300 bg-gray-100 transition group-hover:border-neutral-content/20">
                                    <img
                                        src={work.imageSrc}
                                        alt={work.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-2xl font-bold">{work.title}</h2>
                                        <span className="text-sm text-gray-400 transition group-hover:text-gray-200">
                                            Read more
                                        </span>
                                    </div>
                                    <p className="mt-4 leading-relaxed">{work.summary}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {work.stackGroups.flatMap((group) => group.items).map((item) => (
                                            <span key={item} className="badge badge-outline transition group-hover:border-white group-hover:text-white">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <WorksDialog work={selectedWork} onClose={() => setSelectedWork(null)} />
        </section>
    );
});

function WorksDialog({ work, onClose }: { work: WorkItem | null; onClose: () => void }) {
    return (
        <dialog className={`modal ${work ? "modal-open" : ""}`}>
            <div className="modal-box h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-6xl rounded-box bg-gray-50 px-6 py-10 md:px-10">
                {work ? (
                    <>
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold md:text-5xl">{work.title}</h2>
                                </div>
                                <a
                                    href={work.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline">
                                    GitHub
                                </a>
                            </div>
                            <div className="mt-8 grid flex-1 gap-8 md:grid-cols-[1.2fr_1fr]">
                                <div className="space-y-4">
                                    <div className="self-start overflow-hidden rounded-box border border-base-300 bg-white">
                                        <img
                                            src={work.modalImageSrc ?? work.imageSrc}
                                            alt={work.title}
                                            className="block h-auto w-full object-contain"
                                        />
                                    </div>
                                    {work.modalOnlyImages?.map((image) => (
                                        <div
                                            key={image.src}
                                            className="self-start overflow-hidden rounded-box border border-base-300 bg-white">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="block h-auto w-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="overflow-y-auto pr-1">
                                    <div className="space-y-6">
                                        {work.stackGroups.map((group) => (
                                            <div key={group.title}>
                                                <h3 className="text-lg font-bold">{group.title}</h3>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {group.items.map((item) => (
                                                        <span key={item} className="badge badge-outline">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 space-y-6">
                                        {work.sections.map((section) => (
                                            <section key={section.title}>
                                                <h3 className="text-lg font-bold">{section.title}</h3>
                                                <p className="mt-3 rounded-box bg-white p-4 leading-relaxed shadow-sm">
                                                    {section.description}
                                                </p>
                                            </section>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
                <button
                    type="button"
                    aria-label="Close work details"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}>
                    ✕
                </button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}

export default Works;
