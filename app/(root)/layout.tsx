import MobileNav from "@/components/ui/MobileNav";
import Sidebar from "@/components/ui/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: 'Olawale' ,
   lastName:'Awokoya'};

  return (
    <main className="flex
     h-screen w-full
      font-inter">
        <Sidebar user= {loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
           <Image src="/icons/logo.svg"
             width={30} height={30} alt="menu icons"/>
             <div>
              <MobileNav user={loggedIn}/>
             </div>
          </div>
          {children}
        </div>

        
    </main>
  );
}
