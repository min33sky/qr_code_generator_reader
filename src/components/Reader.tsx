import React, { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function Reader() {
  const [qrUrl, setQrUrl] = useState('');
  const [message, setMessage] = useState('');
  const [parsed, setParsed] = useState('');

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const preivew = URL.createObjectURL(file);
    setQrUrl(preivew);

    // Upload
    const formData = new FormData();
    formData.append('file', file);

    await fetchQrCode(formData);
  };

  const fetchQrCode = async (formData: FormData) => {
    try {
      const response = await fetch(
        'https://api.qrserver.com/v1/read-qr-code/',
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await response.json();
      console.log(data);
      const result = data[0].symbol[0].data;

      if (result) {
        setMessage('QR Code를 성공적으로 읽었습니다.');
        setParsed(result);
      } else {
        setMessage('QR Code가 아닙니다.');
        setParsed('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(parsed);
    setMessage('클립보드에 복사되었습니다.');
  };

  const handleReset = () => {
    setQrUrl('');
    setMessage('');
    setParsed('');
  };

  return (
    <div className="flex flex-col space-y-6">
      <section>
        <label
          htmlFor="file"
          className="group grid h-56 w-full cursor-pointer place-content-center place-items-center gap-y-4 bg-slate-300 transition hover:bg-slate-400 hover:text-slate-200"
        >
          {qrUrl ? (
            <img src={qrUrl} className="h-52" alt="QR Code" />
          ) : (
            <>
              <CloudArrowUpIcon className="h-6 w-6 text-slate-800 transition group-hover:text-slate-200" />
              <span>Upload QR Code</span>
            </>
          )}
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleUploadImage}
          />
        </label>
      </section>

      <div
        className={`flex flex-col space-y-4 overflow-hidden transition-all duration-500 ${
          message ? 'max-h-52' : 'max-h-0'
        }`}
      >
        <p>{message}</p>

        <textarea
          className="w-full resize-none rounded-md border border-slate-400 p-2"
          spellCheck={false}
          value={parsed}
          disabled
        ></textarea>

        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-slate-700 py-4 text-slate-200 transition hover:bg-slate-900"
          >
            초기화
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-slate-700 py-4 text-slate-200 transition hover:bg-slate-900"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
