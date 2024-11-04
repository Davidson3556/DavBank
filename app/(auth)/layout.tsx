import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full
      justify-between font-inter bg-[#41005C]">
          
          <div className="auth-asset">
           
            <div>
                <Image
                src="/icons/login.svg"
                alt="Login Image"
                width={750}
                height={500}
                />
            </div>

         

          

          </div>
           {children}
      </main>
    );
  }
  