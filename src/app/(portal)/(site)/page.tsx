"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';

const DummyContent = () => {
  const router = useRouter();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className="w-full pt-20">{/* Added pt-20 for fixed navbar */}
      <BackgroundBeamsWithCollision>
        <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-20">
          <div className="w-full">
            <Flex width="100%" align="center" justify="center" direction="column">
              <div className="mb-4 flex justify-center">
                <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-semibold border border-purple-500/30">
                  Professional Trader Incubation Program
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
                源计划职业交易员孵化
              </h1>
              <p className="text-2xl md:text-3xl text-center text-gray-700 dark:text-gray-200 mb-6 font-semibold">
                时间是优秀交易员的朋友,耐心与纪律铸就长期成功
              </p>
              <p className="text-base md:text-lg text-center text-gray-400 max-w-3xl mb-12 leading-relaxed">
                我们致力于用最短的时间从大量人群中筛选出少数适合做交易的人才并进行培养并给予支持
              </p>
            </Flex>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => router.push('/splan/join-us')}
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                了解职业孵化
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-10 py-5 bg-white text-gray-900 text-lg font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              >
                进入量化系统
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* 核心价值 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          为什么选择源计划
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">精准筛选</h3>
            <p className="text-gray-600 dark:text-gray-400">
              30个工作日内判断是否适合交易，避免浪费时间。不适合我们会如实告知，适合则全力培养。
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">快速成长</h3>
            <p className="text-gray-600 dark:text-gray-400">
              科学避开错误定式，让合适的人在30个工作日内达到专家10-20年的盈利高度。
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">高额分成</h3>
            <p className="text-gray-600 dark:text-gray-400">
              战利品至少60%属于你，随能力提升最高可达90%以上。荣辱与共，合作共赢。
            </p>
          </div>
        </div>
      </div>

      {/* 职业发展路径 */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            职业发展路径
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            30个工作日系统化培养，从新手到职业交易员
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-green-600"></div>

            <div className="space-y-12">
              {/* Phase 1 */}
              <div className="relative flex items-center md:justify-between">
                <div className="w-full md:w-5/12 md:pr-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                    <div className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-3">
                      第1-5个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">规则学习</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      完成15个标准进场点练习，熟悉交易系统基本规则
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        ⚠️ 3天不能完成规则考核将被劝退
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-600 border-4 border-white dark:border-gray-900 rounded-full items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>

              {/* Phase 2 */}
              <div className="relative flex items-center md:justify-between">
                <div className="w-full md:w-5/12 md:pr-8 md:text-right">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 md:border-l-0 md:border-r-4 border-blue-600 hover:shadow-xl transition-shadow">
                    <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-3">
                      第6-20个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">盈利练习</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      找到适合自己的交易品种，按照盈利考核标准进行练习
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded">
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        💡 保持操作一致性，不错单、不漏单、不亏损
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 border-4 border-white dark:border-gray-900 rounded-full items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>

              {/* Phase 3 */}
              <div className="relative flex items-center md:justify-between">
                <div className="hidden md:block w-5/12"></div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 border-4 border-white dark:border-gray-900 rounded-full items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="w-full md:w-5/12 md:pl-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-shadow">
                    <div className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-3">
                      第21-30个工作日
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">盈利考核</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      连续10个工作日每天做到不错单、不漏单、不亏损
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded">
                      <p className="text-sm text-green-800 dark:text-green-400">
                        ✅ 通过考核进入小额实盘阶段
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative flex items-center md:justify-between">
                <div className="w-full md:w-5/12 md:pr-8 md:text-right">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 shadow-lg border-l-4 md:border-l-0 md:border-r-4 border-yellow-600 hover:shadow-xl transition-shadow">
                    <div className="inline-block px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-semibold mb-3">
                      小额实盘 → 大额矩阵
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">职业交易员</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      20个工作日小额实盘固化后，进入大额矩阵
                    </p>
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-l-4 border-yellow-600 p-3 rounded">
                      <p className="text-sm text-yellow-900 dark:text-yellow-300 font-semibold">
                        🎯 完全自由的工作时间，开始独立交易员生涯
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-600 border-4 border-white dark:border-gray-900 rounded-full items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 基本要求 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          你是否符合基本条件
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          严格的准入标准，确保培养质量
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 人群画像 */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">人群画像</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">学历与年龄</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">大专学历以上，35岁以下</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">心理素质</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">认真、细心、耐心、心理健康</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">性格特质</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">性格内向、稳重、纪律严明且执行力强</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 基本要求 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">基本要求</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">时间投入</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">连续30个工作日（约45天），Windows电脑</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">环境要求</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">独立的交易环境，专注不被打扰</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">在线时间</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">周一到周五 13:30-21:30 在线</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">团队复盘</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">每天20:00团队长会议室复盘</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">重要提醒</h4>
              <p className="text-red-800 dark:text-red-400 text-sm leading-relaxed">
                每个人<strong>只有一次进入的机会</strong>。请在充分了解并确认自己符合全部条件后再申请。我们的理念是<strong>留下极少数，劝返大多数</strong>。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20 w-full">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开启你的交易员生涯了吗？
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            记住：最大风险是淘汰，成本是时间。若明朗、准备就绪，预约面试。通过后，入训。
          </p>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            立即预约面试
          </button>
        </div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

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
      <DummyContent />
    </div>
  );
}
