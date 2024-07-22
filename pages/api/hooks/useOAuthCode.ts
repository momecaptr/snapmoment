// import { useEffect } from 'react';
//
// import axios from 'axios';
// import { useSearchParams } from 'next/navigation';
//
// export const useOAuthCode = (type: any): void => {
//   const fetchUserByGoogle = (code: string) => {
//     // А вот тут собственно и отправляем вырезанный с URL ID пользователя
//     axios.post('http://localhost:3000/api/auth/google', { code })
//       .then((response) => {
//         console.log('google server');
//         localStorage.setItem('user', JSON.stringify(response.data))
//         window.location.assign('/user')
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   },
//   const fetchUserByGitHub = (code: string) => {
//     // А вот тут собственно и отправляем вырезанный с URL ID пользователя
//     axios.post('http://localhost:3000/api/auth/github', { code })
//       .then((response) => {
//         console.log('github server');
//         localStorage.setItem('user', JSON.stringify(response.data))
//         window.location.assign('/user')
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }
//
// console.log('-> type', type);
// const [searchParams] = useSearchParams(window.location.href);
// const code = seatchParams.get('code')
//
// console.log('-> code', code)
// useEffect(() => {
//   try {
//     switch(type){
//       case SOCIAL_NETWORK_LOGIN_TYPE.GOOGLE:
//         fetchUserByGoogle(code)
//         break
//       case SOCIAL_NETWORK_LOGIN_TYPE.GIT_HUB:
//         fetchUserByGitHub(code)
//         break
//     }
//   } catch (error) {
//     console.log('-> error', error);
//   }
//
// }, [])
