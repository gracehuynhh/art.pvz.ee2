import { fetchPostUseCase, fetchRelatedPostsUseCase, Post } from '@/domain';
import { BackButton, Card, Categories, Layout, PostBody } from '@/presentation';

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import HtmlParser from 'html-react-parser';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  //const url = context.req.url ? context.req.url.replace("/posts/", "/") : "";
  const { slug } = query;

  //const url = context.req.url ? context.req.url.replace('/posts/', '/') : '';
  const domain = process.env.DOMAIN;
  const referer = req.headers.referer ? req.headers.referer : '';
  //const redirectURL = `${domain}${slug}`;
  // check if the referrer URL is from Facebook
  const check = /l.facebook.com|m.facebook.com|l.messenger.com|t.co/.test(referer);

  if (check) {
    // redirect to home page
    res.writeHead(301, { Location: `${domain?.toString() || ''}/${encodeURIComponent(slug?.toString() || '')}` });

    res.end();
    return { props: {} };
  }else{
    const post = await fetchPostUseCase(encodeURIComponent((context.params?.slug ?? '').toString()));
    const relatedPosts = (await fetchRelatedPostsUseCase(post.categories.map((category) => category.id)))
      .filter((relatedPost) => relatedPost.id !== post.id)
      .slice(0, 3);
    return { props: { post, relatedPosts } };
  };

  }

 

type Props = {
  post: Post;
  relatedPosts: Post[];
};

const PostPage: NextPage<Props> = (props: Props) => {
  const { post, relatedPosts } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const metaData = post.yoast_head ? post.yoast_head : '';
  // todo: imageには[.w-full.rounded-lg] classを適用したい
  return (
    <>
      <Head>{HtmlParser(metaData)}</Head>
      <Layout title={post.title.rendered} description={post.excerpt.rendered}>
        <BackButton onClick={() => router.back()} />
        <div className='relative overflow-hidden py-8 bg-white bg-opacity-50 rounded-md shadow-md sm:py-16'>
          <div className='relative px-4 sm:px-6.lg:px-8'>
            <div className='mx-auto max-w-prose text-lg'>
              <Categories categories={post.categories} isLink={true} />
              <h1 className='mb-8'>
                <span className='mt-2 block text-center text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                  {post.title.rendered}
                </span>
              </h1>
            </div>
            <div className='prose prose-base prose-cyan mx-auto text-gray-600 sm:prose-lg'>
              <PostBody content={post.content.rendered} />
            </div>
          </div>
        </div>
        {relatedPosts.length !== 0 && (
          <div className='mt-5 mx-auto space-y-2 sm:space-y-3'>
            <div className='text-gray-700 text-xl font-semibold'>Featured</div>
            <div className='justify-center space-y-2 sm:space-y-3'>
              {relatedPosts.map((post) => (
                <Card key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default PostPage;
