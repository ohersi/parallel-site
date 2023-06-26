// Packages
import { cookies } from 'next/headers';
import { Metadata } from 'next';
// Imports
import DefaultFeed from '@/components/feed/default.feed';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home Page',
}

const HomePage = async () => {

  const cookieStore = cookies();
  const session = cookieStore.has(process.env.SESSION_ID!);

  return (
    <main>
      <div>HOME PAGE</div>
      <div>
        {
          cookieStore.getAll().map((cookie) => (
            <div key={cookie.name}>
              <p>Name: {cookie.name}</p>
              <p>Value: {cookie.value}</p>
            </div>
          ))
        }
      </div>
    </main>
  )
};

export default HomePage;
