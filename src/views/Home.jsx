import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/transactions', { replace: true });
      };
  return (
    <>
      <NavBar />
      <main className="bg-background mt-16 p-10 ssm:h-4/5 flex items-center">
        <section className="bg-text p-10 rounded-3xl">
          <div></div>
          <h1 className="text-background w-5/6 md:text-8xl ssm:text-5xl sm:text-6xl">
            One-Stop Solution for Your Finances
          </h1>
          <p className="text-background ssm:mt-5 ssm:text-xs md:w-3/4 md:text-2xl sm:text-xl">
            Welcome to the Personal Finance Tracker Application, your all-in-one
            solution for managing and monitoring your financial activities.
          </p>
          <div className="flex justify-end mt-10 ">
            <button onClick={handleClick} className="bg-primary w-36 h-12 rounded-xl text-background hover:bg-secondary hover:text-background">
              Transactions List
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
