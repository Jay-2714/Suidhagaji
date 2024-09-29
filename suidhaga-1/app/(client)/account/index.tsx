// pages/account/index.tsx
"use client";

import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Account() {
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const router = useRouter();

  useEffect(() => {
    if (!loading && data?.authUser?._id) {
      const userAccountId = data.authUser._id;
      console.log(userAccountId);
      
      router.push(`/account/${userAccountId}`);
    }
  }, [data, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // return <p>Redirecting...</p>;
}
