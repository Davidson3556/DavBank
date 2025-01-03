import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  return (

    <main
      className="flex min-h-screen w-full
      justify-between font-inter bg-[#41005C]"
    >
      <div className="auth-asset">
        <div>
          <p className="text-[#8A00C2] font-bold ml-8 mt-8">TRANSACTLY</p>
          <Image
            src="/icons/login.svg"
            alt="Login Image"
            width={750}
            height={500}
            className="self-center h-[500px]"
          />

          <p className="text-[#8A00C2] font-bold text-center text-xl">
            Simplifying Payments, <br />
            Reshaping Transactions
          </p>
        </div>
      </div>
      {children}
      <ToastContainer />
    </main>
  );
}
