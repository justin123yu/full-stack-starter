import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

function Home() {
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main>
      <div className='text-center'>
        <h2>Welcome to my Food Journey</h2>
        <p className=""> This website is created to showcase Restaurants that I liked</p>
        <p className="">Click on Restaurants to see more !</p>
      </div>
    </main>
    </>
  );
}

export default Home;
