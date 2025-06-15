"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";

import React, { useState } from 'react';
import CryptoMarquee from '@/components/custom/CryptoMarquee';
import HistoricalEarnings from "@/components/custom/HistoricalEarnings";
import Pricing from "@/components/custom/Pricing";
import MeetYou from "@/components/custom/MeetYou";

const navItems = [
  {
    name: "收益",
    link: "#profits",
  },
  {
    name: "价格",
    link: "#pricing",
  },
  {
    name: "工具",
    link: "#tools",
  },
  {
    name: "联系我们",
    link: "mailto:x.stark.dylan@gmail.com",
  },
];

const words = [
  {
    text: "你好，"
  },
  {
    text: "这里是"
  },
  {
    text: "CRYPTO CASH CONTROL",
    className: "text-[#0600abac] dark:text-[#0600abac]"
  },
  {
    text: "团队，欢迎访问！"
  },
]

const blogContent = {
  description:
    "CRYPTO CASH CONTROL 团队成立于 2024 年底，由三位核心成员组成，拥有数十年经验的交易员、全栈工程师以及一位资深市场分析专家。我们的交易系统由现货，ALT-COIN 合约，美式期权对冲构成。",
  image: "/banner.png",
};

const DummyContent = () => {
  return (
    <div className="mx-auto p-1">
      <BackgroundBeamsWithCollision>
        <div className="relative">
          <Flex width="100%" align="center" justify="center">
            <TypewriterEffectSmooth words={words} />
          </Flex>
          <p className="mb-10 text-center text-sm text-zinc-500">
            我们的数字货币辅助交易工具正在加速开发并且
            {" "}<Code>很快将会发布</Code>，请关注我们吧。
          </p>
          <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
            <div className="mt-10 flex flex-row items-center justify-center">
              <LinkPreview
                url="https://x.com/CryptoCashCtrl"
                className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
                关注我们以获得更多信息
              </LinkPreview>
            </div>
          </h1>
        </div>
      </BackgroundBeamsWithCollision>
      <HistoricalEarnings />
      <Pricing />
      <MeetYou />
      <Flex width="100%" align="center" justify="center" className="p-2 pt-4">
        <Text color="gray" size="1">
          2024-2025 © CRYPTO CASH CONTROL TEAM
        </Text>
      </Flex>
    </div>
  );
};

export default function Home() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const joinus = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // open link to joinus page.
  }

  return (
    <div className="w-full">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#000"
        />
      </div>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton href="mailto:x.stark.dylan@gmail.com" variant="primary">加入我们</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => joinus()}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-2">
              <NavbarButton
                onClick={() => joinus()}
                variant="primary"
                className="w-full"
                href="mailto:x.stark.dylan@gmail.com"
              >
                加入我们
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <DummyContent />
      <CryptoMarquee />

      {/* Navbar */}
    </div>
  );
}