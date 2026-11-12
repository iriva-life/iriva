import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'青鸟 IRIVA · 从敢开口，到有话想说',description:'在被看见、被回应的关系里，自在开口。4位固定伙伴、1位温暖的Host，四周 Pilot 共同经历，找到想说话的人。'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
