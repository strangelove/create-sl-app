import { H1 } from "@/components/typography";

const Home = () => {
  return (
    <div id="container" className="w-full h-full">
      <H1>SL custom app ( Next.js - Typescript - Tailwind - SASS )</H1>
    </div>
  );
};

export async function getStaticProps() {
  // * NOTE: This an example of how to get data from Contentful in static pages.
  // const isPreview = !!preview ?? false
  // const { data, error } = await getHomePageData(isPreview);

  return {
    props: {
      // data,
      // error
    },
  };
}

export default Home;
