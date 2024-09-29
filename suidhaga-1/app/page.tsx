"use client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/users.queries";
import { useNavigate } from "@/hooks/useRoute";
import { useQuery } from "@apollo/client";

export default function Home() {
  const router = useNavigate();
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  console.log(`Authenticated users`, data);

  return (
    <>
      <div className="text-xl">
        click here to visit home page
        <span className="cursor-pointer ml-1" onClick={() => router("/jobs")}>
          HOME
        </span>{" "}
      </div>
    </>
  );
}
