"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function EmailContactModal({ isOpen, onClose, title = "职业交易员面试" }: EmailContactModalProps) {
  const emailAddress = "x.stark.dylan@gmail.com";
  const emailSubject = title;

  const handleSendEmail = () => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    alert('邮箱地址已复制到剪贴板');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              请发送您的简历到以下邮箱，我们会尽快与您联系：
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">邮箱地址：</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-purple-600 font-mono text-sm flex-1">
                  {emailAddress}
                </code>
                <button
                  onClick={handleCopyEmail}
                  className="text-purple-600 hover:text-purple-700 text-sm font-semibold whitespace-nowrap"
                >
                  复制
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">邮件主题：</p>
              <code className="text-gray-900 font-mono text-sm">
                {emailSubject}
              </code>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>提示：</strong>请在邮件中包含您的基本信息、教育背景、以及为什么想成为职业交易员。
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSendEmail}
                className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
              >
                打开邮件客户端
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
