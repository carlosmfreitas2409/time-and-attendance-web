import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import decode from 'jwt-decode';

type WithSSRAuthOptions = {
  isAdmin: boolean;
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@TimeAttendance:token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if(options) {
      const user = decode<{ isAdmin: boolean }>(token);
      const { isAdmin } = options;
      
      if(isAdmin && !user.isAdmin) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
    
    try {
      return await fn(ctx);
    } catch (err) {
      console.log(err);
    }
  }
}