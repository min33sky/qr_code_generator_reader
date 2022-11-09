import React from 'react';
import codes from '../assets/qrcode.png';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function Reader() {
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('zzzzz');
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('file', file);
  };

  return (
    <div className="flex flex-col space-y-6">
      <section>
        <label
          htmlFor="file"
          className="group grid h-56 w-full cursor-pointer place-content-center place-items-center gap-y-4 bg-slate-300 transition hover:bg-slate-600 hover:text-slate-200"
        >
          <CloudArrowUpIcon className="h-6 w-6 text-slate-800 transition group-hover:text-slate-200" />
          <span>Upload QR Code</span>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleUploadImage}
          />
        </label>
      </section>

      <footer>
        <textarea
          className="w-full resize-none rounded-md border border-slate-400"
          spellCheck={false}
          disabled
        ></textarea>
        <div className="flex gap-4">
          <button className="flex-1 bg-slate-700 py-4 text-slate-200 transition hover:bg-slate-900">
            닫기
          </button>
          <button className="flex-1 bg-slate-700 py-4 text-slate-200 transition hover:bg-slate-900">
            저장
          </button>
        </div>
      </footer>
    </div>
  );
}
