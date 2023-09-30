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
      <div>
        <h2 className="landingText mt-4 text-dark">Welcome to my Food Journey</h2>
        <p className="landingText mt-4 text-dark"> This website is created to showcase Restaurants that I liked</p>
        <p className="landingText text-dark">Click on Restaurants to see more !</p>
      </div>
    </main>
    </>
  );
}

export default Home;
