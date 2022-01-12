import type { NextPage } from "next";

import { H1 } from "src/components/typography";

const Home: NextPage = () => {
  return (
    <div id="container" className="w-full h-full">
      <H1>
        SL custom app ( Next.js - Typescript - Tailwind - SASS )
      </H1>
    </div>
  );
};

export default Home;
