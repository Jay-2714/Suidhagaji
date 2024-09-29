//*This hook is used for routing between pages;
//*The function requires a url as a child;
//*The top progress bar is initiated while routing;

var NProgress = require('nprogress')
import { useRouter } from "next/navigation";

export function useNavigate(){
    const route = useRouter();
    const router = (url:String)=>{
    NProgress.start();
    route.push(`${url}`)
    NProgress.done(true);
  };
  return router; 

}
