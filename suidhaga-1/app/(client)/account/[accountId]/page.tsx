// pages/account/[accountId].tsx
"use client";

import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from '@/components/card/profile';
import ProfileImage from '@/public/image/man.jpg'

export default function Account() {
  const { accountId } = useParams<{ accountId: string }>();
  const { data, loading, error } = useQuery(GET_AUTHENTICATED_USER);
  const [userAccountId, setUserAccountId] = useState<string | undefined>();

  useEffect(() => {
    if (data?.authUser) {
      setUserAccountId(data.authUser._id);
    }
  }, [data]);

  console.log(data)

  useEffect(() => {
    console.log(userAccountId);
  }, [userAccountId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return(<>
    <div>
      <Profile imageSrc={ProfileImage.src} name={`${data?.authUser?.username}`} email={`${data?.authUser?.email}`} phone={`${data?.authUser?.phone}`} />
    </div>
  </>)
}
