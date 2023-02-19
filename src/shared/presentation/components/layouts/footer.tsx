import Image from 'next/image';

type FooterItem = {
  filename: 'github' | 'twitter' | 'menta' | 'mail';
  url: string;
};

type FooterItemProps = {
  item: FooterItem;
};

const FooterItem: React.FC<FooterItemProps> = ({ item }: FooterItemProps) => {
  return (
    <div className='relative'>
      <Image
        className='w-6 h-6'
        src={`/static/images/${item.filename}.svg`}
        alt={`${item.filename}`}
        width='100'
        height='100'
      />
      <a className='absolute inset-0' href={item.url} target='_blank' rel='noreferrer'></a>
    </div>
  );
};

export const Footer: React.FC = () => {
 
  return (
    <footer className='justify-between text-center sm:flex'>
      
      <div className='text-gray-700 sm:order-first'>copyright &copy; 2016-2023 GraceHuynh</div>
    </footer>
  );
};
