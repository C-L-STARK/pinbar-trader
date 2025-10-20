"use client";

import React from 'react';
import Link from 'next/link';

export default function SplanFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">源计划</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              专注于筛选和培养顶尖交易员的孵化器组织,用最短的时间从大量人群中筛选出少数适合做交易的人才。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">快速导航</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/splan/join-us" className="text-gray-400 hover:text-purple-400 transition-colors">
                  职业孵化
                </Link>
              </li>
              <li>
                <Link href="/splan/courses" className="text-gray-400 hover:text-purple-400 transition-colors">
                  成长计划
                </Link>
              </li>
              <li>
                <Link href="/splan/faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/splan/psychology-test" className="text-gray-400 hover:text-purple-400 transition-colors">
                  心理测评
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">
                  量化系统
                </Link>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-purple-400 transition-colors">
                  百万美金交易员
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-purple-400 transition-colors">
                  交易员:转瞬百万
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>培养真正适合的人</li>
              <li>留下极少数,劝返大多数</li>
              <li className="pt-2">
                <Link href="/splan/join-us"
                      className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                  立即申请
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>2024-2025 © 源计划职业交易员孵化器 · 专业交易员培养平台</p>
          <p className="mt-2 text-xs">
            ⚠️ 交易有风险,投资需谨慎 · 本站内容仅供学习参考,不构成投资建议
          </p>
        </div>
      </div>
    </footer>
  );
}
