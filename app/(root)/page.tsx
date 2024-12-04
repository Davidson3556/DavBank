import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async({searchParams: { id, page } }: SearchParamProps ) => {
  const loggedIn= await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$userId });

  if(!accounts) return;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId});

  return (
    <section className="home">
    <div 
    className="home-content">
      <header 
      className="home-header">
            <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Easily access and manage your account and transactions."
            />
            <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={account?.currentBalance}
            />

      </header>
      RECENT TRANSACTIONS
    </div>
    <RightSidebar
    user={loggedIn}
    transactions={accounts?.transactions}
    banks={ accountsData?.slice(0,2)}
    />
    </section>
  )
}

export default Home
