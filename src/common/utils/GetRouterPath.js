import { useRouter } from "next/router";

const GetRouterPath = () => useRouter().pathname.split("/")[1];

export default GetRouterPath;
