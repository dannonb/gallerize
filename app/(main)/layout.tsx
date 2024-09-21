import Header from "@/components/header/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
            {/* @ts-expect-error Server Component */} 
            <Header />
            {children}
        </div>
    )
}