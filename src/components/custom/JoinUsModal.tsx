"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinUsModal({ isOpen, onClose }: JoinUsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  加入源计划
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  欢迎加入源计划职业交易员孵化器！我们致力于培养下一代专业交易员。
                </p>

                <div className="bg-gray-50 dark:from-gray-900/20 dark:to-gray-900/20 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                    申请流程
                  </h3>
                  <ul className="text-left text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">1.</span>
                      <span>通过邮件联系团队长，提交您的申请意向</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">2.</span>
                      <span>完成交易心理测评，帮助我们了解您的交易性格</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">3.</span>
                      <span>团队长将与您联系，安排初步面谈</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">4.</span>
                      <span>通过面试后，正式开始培训课程</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:1526824204@qq.com?subject=申请加入源计划职业交易员孵化器"
                    className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
                  >
                    📧 联系团队长
                  </a>
                  <a
                    href="/splan/psychology-test"
                    onClick={onClose}
                    className="w-full py-3 px-6 bg-white dark:bg-gray-700 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-gray-600 transition-all"
                  >
                    🧠 完成心理测评
                  </a>
                </div>

                <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                  我们期待与您一起开启职业交易生涯！
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
