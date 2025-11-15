export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-black/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} OldCar. All rights reserved.
        </div>
        <div className="flex gap-5 text-neutral-600 dark:text-neutral-400">
          <a href="/privacy" className="hover:text-vintageGold transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-vintageGold transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
