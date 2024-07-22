// src/components/GoogleAuthProvider.tsx
import React, { ReactNode } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
  const clientId = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com';

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
};

export default GoogleAuthProvider;
