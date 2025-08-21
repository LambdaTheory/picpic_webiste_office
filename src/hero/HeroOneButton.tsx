import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="flex h-full flex-col items-center justify-center text-center">
    <h1 className="mb-4 whitespace-pre-line font-sans text-6xl font-bold leading-hero text-gray-100">
      {props.title}
    </h1>
    <div className="mb-2 mt-8">{props.description}</div>

    {props.button}
  </header>
);

export { HeroOneButton };
