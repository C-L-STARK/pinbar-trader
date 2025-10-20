"use client";

import React from 'react';
import Link from 'next/link';

export default function SplanNavbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">
              源计划
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/splan/join-us"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              职业孵化
            </Link>
            <Link
              href="/splan/courses"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              成长计划
            </Link>
            <Link
              href="/splan/faq"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              常见问题
            </Link>
            <Link
              href="/splan/psychology-test"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              心理测评
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              量化系统
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 text-sm"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link
            href="/splan/join-us"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600"
          >
            职业孵化
          </Link>
          <Link
            href="/splan/courses"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600"
          >
            成长计划
          </Link>
          <Link
            href="/splan/faq"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600"
          >
            常见问题
          </Link>
          <Link
            href="/splan/psychology-test"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600"
          >
            心理测评
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 text-purple-600 dark:text-purple-400 font-semibold"
          >
            量化系统
          </Link>
        </div>
      </div>
    </nav>
  );
}
