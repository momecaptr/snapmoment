import { ParsedUrlQuery } from 'node:querystring';

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';

import { PostTest } from '../index';

interface PostProps {
  post: PostTest;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

// http://localhost:3000/public/posts/4
/*3)*/ export default function Post({ post }: PostProps) {
  return (
    <div>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </div>
  );
}

/*1)*/
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: PostTest[] = await res.json();

  // Получить пути, которые мы хотим предварительно рендерить на основе постов
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }
  }));

  // Мы выполним предварительную визуализацию только этих путей во время сборки.
  // { fallback: false } означает, что другие маршруты должны 404
  return { fallback: false, paths };
};

// Это также вызывается во время сборки.
/*2)*/ export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context: GetStaticPropsContext<Params>
): Promise<GetStaticPropsResult<PostProps>> => {
  // params содержит `id` поста
  // Если маршрут такой как /posts/1, то params.id равен 1
  const { params } = context;

  if (!params) {
    return {
      notFound: true
    };
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post: PostTest = await res.json();

  // Передача данных поста на страницу через пропсы
  return { props: { post } };
};
