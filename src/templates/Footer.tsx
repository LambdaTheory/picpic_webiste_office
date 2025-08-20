import { Background } from '../background/Background';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Section } from '../layout/Section';
import { Logo } from './Logo';

const Footer = () => (
  <Background color="bg-dark-800">
    <Section>
      <CenteredFooter logo={<Logo />} />
      <div className="mt-8 border-t border-gray-600 pt-8 text-center">
        <p className="text-sm text-gray-400">
          © Copyright 2025 PicPic. All rights reserved.
        </p>
      </div>
    </Section>
  </Background>
);

export { Footer };
