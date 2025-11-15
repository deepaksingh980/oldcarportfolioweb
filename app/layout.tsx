import './globals.css';
import { ThemeProviderWrapper } from './components/ThemeProviderWrapper';
import LayoutContent from './components/LayoutContent';

export const metadata = {
  title: "Deepak Cars – Used Cars in Bhubaneswar, Odisha",
  description:
    "Buy verified second hand cars in Bhubaneswar, Odisha. Premium used cars, budget cars, luxury cars – Deepak Cars.",
  keywords: [
    "used cars in bhubaneswar",
    "second hand cars odisha",
    "deepak cars bhubaneswar",
    "car dealership bhubaneswar",
    "buy used cars odisha",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
