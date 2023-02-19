import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header: React.FC = () => {
  const router = useRouter();
  const isCurrentPath = (path: 'pages' | 'posts' | 'projects' | 'about'): boolean => {
    const splitedRoute = router.asPath.split('/');
    return splitedRoute.includes(path);
  };
  return (
    <nav className='py-3 bg-white rounded-md shadow-lg px-7 bg-opacity-60 mb-5 sm:mb-16'>
      <div className='flex items-center justify-between'>
        <Link href='/pages/1' className='text-2xl font-semibold tracking-wide text-gray-700 whitespace-nowrap'>
          Home
        </Link>
       
        <Link
            href='/pages/1'
            className={`tracking-wider text-gray-700 text-base ${
              isCurrentPath('pages') || isCurrentPath('posts')
                ? 'underline underline-offset-2 decoration-gray-700 decoration-2'
                : ''
            }`}
          >
            Posts
          </Link>

      </div>
      {/* mobile */}
      <div className='grid grid-cols-3 divide-x divide-gray-300 mt-3 sm:hidden'>
        <Link
          href='/pages/1'
          className={`tracking-wider text-gray-700 text-sm text-center ${
            isCurrentPath('pages') || isCurrentPath('posts')
              ? 'underline underline-offset-2 decoration-gray-700 decoration-2'
              : ''
          }`}
        >
          Posts
        </Link>
       
      </div>
      {/* end mobile */}
    </nav>
  );
};
