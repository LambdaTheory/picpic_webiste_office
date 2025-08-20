import type { ReactNode } from 'react';

import { Meteors } from '../components/ui/meteors';

type ICTABannerProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
};

const CTABanner = (props: ICTABannerProps) => (
  <div className="relative flex flex-col overflow-hidden rounded-md border border-dark-600 bg-dark-700 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left">
    <Meteors number={15} className="text-primary-400" />

    <div className="relative z-10 text-2xl font-semibold">
      <div className="text-gray-100">{props.title}</div>
      <div className="text-primary-400">{props.subtitle}</div>
    </div>

    <div className="whitespace-no-wrap relative z-10 mt-3 sm:ml-2 sm:mt-0">
      {props.button}
    </div>
  </div>
);

export { CTABanner };
