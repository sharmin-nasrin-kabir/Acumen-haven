import Image from "next/image"

function getYoutubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url?.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

export function BlogRenderer({ content }: { content: string }) {
    let blocks: any[] = []
    let isBlocks = false

    try {
        if (content.startsWith('[') && content.endsWith(']')) {
            const parsed = JSON.parse(content)
            if (Array.isArray(parsed)) {
                blocks = parsed
                isBlocks = true
            }
        }
    } catch {
        isBlocks = false
    }

    if (isBlocks) {
        return (
            <div className="space-y-12">
                {blocks.map((block: any) => {
                    if (block.type === 'heading') return <h2 key={block.id} className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mt-10 mb-5 tracking-tight uppercase italic">{block.value}</h2>;
                    if (block.type === 'paragraph') return <div key={block.id} className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium prose prose-slate max-w-none mb-8" dangerouslySetInnerHTML={{ __html: block.value }} />;
                    if (block.type === 'image') return (
                        <figure key={block.id} className="my-14 -mx-4 md:-mx-12 lg:-mx-20">
                            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] group">
                                <Image src={block.value} alt={block.caption || ""} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </div>
                            {block.caption && <figcaption className="text-center text-sm md:text-base text-slate-400 mt-6 font-bold uppercase tracking-widest">{block.caption}</figcaption>}
                        </figure>
                    );
                    if (block.type === 'youtube') {
                        const id = getYoutubeId(block.value);
                        return id ? (
                            <div key={block.id} className="my-14 aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-black border-[12px] border-white">
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        ) : null;
                    }
                    return null;
                })}
            </div>
        )
    }

    return (
        <div className="prose prose-lg prose-slate max-w-none">
            <div className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}
