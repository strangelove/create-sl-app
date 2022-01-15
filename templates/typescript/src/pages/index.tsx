import { getHomePageData } from "@/services/contentful/api";
import { H1 } from "@/components/typography";
import PageProps from '@/interfaces/page'

/* 
  * NOTE: Replace type <any> in PageProps<any> with page specific props type.
  * Example: <HomePageProps>. Then remove this comment :)
*/
const Home = ({ data, error }: PageProps<any>) => {
  return (
    <div id="container" className="w-full h-full">
      <H1>
        SL custom app ( Next.js - Typescript - Tailwind - SASS )
      </H1>
    </div>
  );
};

export async function getStaticProps({ preview }: any) {
  const isPreview: boolean = !!preview ?? false
  const { data, error } = await getHomePageData(isPreview);

  return {
    props: {
      data,
      error
    },
  };
}

export default Home;
