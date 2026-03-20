import { forwardRef } from "react";

const Contact = forwardRef<HTMLDivElement>(function Contact(_props, ref) {
    return (
        <section ref={ref} className="w-full bg-gray-50 py-20">
            <div className="mx-auto w-full px-5 md:w-9/12 md:px-0">
                <h1 className="text-5xl font-bold">Contact</h1>
                <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-8 shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-base-300 pb-6 md:flex-row md:items-baseline md:gap-6">
                        <p className="min-w-20 text-lg text-gray-600">Mail</p>
                        <a
                            href="mailto:contact@a-shota.com"
                            className="inline-block text-2xl font-semibold underline decoration-gray-300 underline-offset-4 transition hover:decoration-black">
                            contact@a-shota.com
                        </a>
                    </div>
                    <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                        <p className="min-w-20 text-lg text-gray-600">𝕏</p>
                        <a
                            href="https://x.com/aikawa_shota"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-2xl font-semibold underline decoration-gray-300 underline-offset-4 transition hover:decoration-black">
                            @aikawa_shota
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Contact;
