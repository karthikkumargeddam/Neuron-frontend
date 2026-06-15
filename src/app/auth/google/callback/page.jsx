"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const access_token = searchParams.get('access_token');

  useEffect(() => {
    if (access_token) {
      // Pass the Strapi JWT to NextAuth Credentials provider
      signIn('credentials', {
        access_token,
        redirect: false,
      }).then((res) => {
        if (res?.error) {
          console.error("Failed to sign in with NextAuth:", res.error);
          router.push(`/auth/signin?error=${encodeURIComponent(res.error)}`);
        } else {
          // Success! Redirect to dashboard
          window.location.href = '/dashboard';
        }
      });
    } else {
      router.push('/auth/signin?error=MissingToken');
    }
  }, [access_token, router]);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
        <h2 className="text-xl text-white font-mono">Authenticating with Google...</h2>
        <p className="text-gray-400 mt-2">Please wait while we set up your session.</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
