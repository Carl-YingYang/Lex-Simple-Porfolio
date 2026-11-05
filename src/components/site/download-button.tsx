import { Clock, Download } from "lucide-react";
import { APP_DOWNLOAD_URL } from "@/config/site";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white" | "outline";
  className?: string;
}

/**
 * The one true download control for the whole site.
 *
 * - When `APP_DOWNLOAD_URL` (src/config/site.ts) is set, this renders a real
 *   link that opens / downloads the official installation package.
 * - While it is null, the button stays fully functional by pointing to the
 *   #download section, which clearly explains the "Android coming soon" state.
 *   It never links to a nonexistent file.
 */
export function DownloadButton({
  label = "I-download ang App",
  size = "md",
  variant = "primary",
  className,
}: DownloadButtonProps) {
  const sizeClass =
    size === "sm" ? "btn-brutal-sm" : size === "lg" ? "btn-brutal-lg" : "btn-brutal-md";
  const variantClass =
    variant === "white" ? "btn-brutal-white" : variant === "outline" ? "btn-brutal-outline" : "btn-brutal-primary";

  if (APP_DOWNLOAD_URL) {
    return (
      <a
        href={APP_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("btn-brutal", variantClass, sizeClass, className)}
      >
        <Download aria-hidden className="size-4" />
        {label}
      </a>
    );
  }

  return (
    <a href="#download" className={cn("btn-brutal", variantClass, sizeClass, className)}>
      <Download aria-hidden className="size-4" />
      {label}
      <span className="ml-1 hidden items-center gap-1 rounded-[3px] border border-ink/25 bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider sm:inline-flex">
        <Clock aria-hidden className="size-3" />
        Malapit na
      </span>
    </a>
  );
}
