"use client";

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(url);
}

export default function VideoUploader({
  value = "",
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const embedUrl = value ? getEmbedUrl(value) : null;
  const isFile = value ? isVideoFile(value) : false;

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste YouTube / Vimeo / .mp4 URL"
        className="w-full px-3 py-2 text-sm rounded-xl border border-border-light bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
      />
      {value && (
        <div className="relative rounded-xl overflow-hidden bg-black border border-border-light group">
          {embedUrl ? (
            <div className="aspect-video">
              <iframe src={embedUrl} className="w-full h-full" allowFullScreen title="Project video" />
            </div>
          ) : isFile ? (
            <video src={value} controls className="w-full aspect-video" />
          ) : (
            <div className="aspect-video flex items-center justify-center bg-bg-secondary text-text-tertiary text-sm">
              Unsupported video URL
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
