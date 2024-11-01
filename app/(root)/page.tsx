import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async() => {
  const loggedIn= await getLoggedInUser();

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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000089.35}
            />

      </header>
      RECENT TRANSACTIONS
    </div>
    <RightSidebar
    user={loggedIn}
    transactions={[]}
    banks={[{currentBalance:3004798.45},
       {currentBalance: 900421.56}]}
    />
    </section>
  )
}

export default Home
