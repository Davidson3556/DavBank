import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';

const Home = () => {
  const loggedIn= {firstName: 'Olawale'};

  return (
    <section className="home">
    <div 
    className="home-content">
      <header 
      className="home-header">
            <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Effortlessly access and manage your account and transactions"
            />
            <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={3299950.35}
            />

      </header>
      
    </div>
    </section>
  )
}

export default Home
