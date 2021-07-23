import { useRouter } from "next/router";

const GetRouterPath = () => {
  const router = useRouter();
  return router.pathname.split("/")[1];
};

export default GetRouterPath;
