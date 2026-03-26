import type { WorkItem } from "./Works";

interface WorkDetailsModalProps {
    work: WorkItem;
    onClose: () => void;
}

export default function WorkDetailsModal({ work, onClose }: WorkDetailsModalProps) {
    return (
        <dialog className="modal modal-open">
            <div className="modal-box h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-6xl rounded-box bg-gray-50 px-6 py-10 md:px-10">
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
