import DeleteBlockButton from '@/components/button/deleteBlock.button';
import { cookies } from 'next/headers';

export default function Home() {

  const cookieStore = cookies();

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
}
