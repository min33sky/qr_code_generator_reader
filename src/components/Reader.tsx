import React, { useRef, useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  CloudArrowUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function Reader() {
  const [qrUrl, setQrUrl] = useState('');
  const [parsed, setParsed] = useState('');
  const toastId = useRef<string>();

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toastId.current = toast.loading('QR Code를 분석 중입니다...');

    // QR Code Preview
    const preivew = URL.createObjectURL(file);
    setQrUrl(preivew);

    // Upload Setting
    const formData = new FormData();
    formData.append('file', file);

    await fetchQrCode(formData);

    //? 초기화를 해줘야 똑같은 파일이 업로드 되어도 onChange 이벤트가 발생한다.
    e.target.value = '';
  };

  /**
   * QR CODE 파싱 API를 이용해 QR Code를 해석한다.
   */
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
      const result = data[0].symbol[0].data;

      if (result) {
        toast.success('QR Code를 성공적으로 읽었습니다.', {
          id: toastId.current,
        });
        setParsed(result);
      } else {
        toast.error('QR Code가 아닙니다.', {
          id: toastId.current,
        });
        setParsed('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(parsed);
    toast.success('클립보드에 복사되었습니다.');
  };

  const handleReset = () => {
    setQrUrl('');
    setParsed('');
  };

  return (
    <div className="flex flex-col space-y-6">
      <section>
        <label
          aria-label="Upload QR Code"
          title="QR Code를 업로드하세요."
          htmlFor="file"
          className="group grid h-40 w-full cursor-pointer place-content-center place-items-center gap-y-2 border border-dashed border-cyan-600 text-cyan-500 transition hover:bg-cyan-50 hover:text-cyan-600"
        >
          {qrUrl ? (
            <img src={qrUrl} className="h-32" alt="QR Code" />
          ) : (
            <>
              <CloudArrowUpIcon className="h-6 w-6 text-cyan-500 transition group-hover:animate-pulse group-hover:text-cyan-600" />
              <span className="group-hover:animate-bounce">Upload QR Code</span>
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
          parsed ? 'max-h-52' : 'max-h-0'
        }`}
      >
        <textarea
          className="w-full resize-none rounded-md border border-cyan-600 p-2"
          spellCheck={false}
          value={parsed}
          disabled
        ></textarea>

        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-cyan-600 py-2 text-cyan-100 transition hover:bg-cyan-900"
          >
            <TrashIcon className="inline-block h-6 w-6" />
            <p>초기화</p>
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-cyan-600 py-2 text-cyan-100 transition hover:bg-cyan-900"
          >
            <ClipboardDocumentCheckIcon className="inline-block h-6 w-6" />
            <p>복사하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
