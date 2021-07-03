import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@TimeAttendance:token'];

    if (token) {
      return {
        redirect: {
          destination: '/admin/registers',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }
}