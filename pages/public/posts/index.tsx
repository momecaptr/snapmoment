// нужно получить сообщения (путем вызова какой-либо конечной точки API)
// прежде чем эту страницу можно будет предварительно отобразить.

import { GetStaticProps } from 'next';

export interface PostTest {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface PostArrayTest {
  posts: PostTest[];
}

// http://localhost:3000/public/posts
/*2)*/ export default function Posts({ posts }: PostArrayTest) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Эта функция вызывается во время сборки
/*1)*/ export const getStaticProps: GetStaticProps<PostArrayTest> = async () => {
  // Вызов внешней конечной точки API для получения сообщений
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json(); // парсим json

  // Возвращая { props: {posts} }, компонент Post получит `posts` в качестве пропсов во   время сборки
  return {
    props: {
      posts
    },
    revalidate: 60
  };
};
