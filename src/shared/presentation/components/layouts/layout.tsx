import { Footer } from './footer';
import { CustomHead } from './head';
import { Header } from './header';

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  imageSrc?: string;
};

const defaultDescription =
  'Magazine。';
const defaultKeyWords = 'Magazine';
const defaultImage = '/static/images/kyuri.png';

export const Layout: React.FC<Props> = ({ children, title, description, keywords, imageSrc }: Props) => {
  return (
    <div className='flex flex-col min-h-screen w-full p-5 mx-auto sm:max-w-4xl sm:py-12'>
      <CustomHead
        title={title ? `${title}|News` : " News"}
        description={description ?? defaultDescription}
        keywords={keywords ?? defaultKeyWords}
        imageSrc={imageSrc ?? defaultImage}
      />
      <div className='flex-grow'>
        <main>
          <Header />
          {children}
        </main>
      </div>
      <hr className='border-t border-white my-12' />
      <Footer />
    </div>
  );
};
