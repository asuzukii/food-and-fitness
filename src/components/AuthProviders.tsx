"use client";

import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParms?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);
  return providers && (
    <div>
      {Object.values(providers).map((provider: Provider, i) => (
        <button
          key={i}
          onClick={() => signIn(provider?.id)}
        >
          {provider.id}
        </button>
      ))}
    </div>
  );
};

export default AuthProviders;