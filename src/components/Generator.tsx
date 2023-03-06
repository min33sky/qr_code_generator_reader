import { useState } from 'react';

/**
 * QR Code Generator
 */
export default function Generator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
    console.log('결과: ', code);
    setQrUrl(code);
  };

  return (
    <div className="flex flex-col space-y-4">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Input to enter the URL or text to be converted to QR Code"
          title="QR 코드로 변환할 URL이나 Text를 입력하세요."
          className="w-full border-b border-b-cyan-500 bg-transparent py-2 text-base text-cyan-700 outline-none"
          placeholder="QR Code로 변환할 URL이나 Text를 입력하세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-cyan-700 py-2 text-lg tracking-widest text-cyan-100 transition hover:bg-cyan-900">
          생성하기
        </button>
      </form>

      <footer
        className={`flex  items-center justify-center overflow-hidden rounded-md bg-cyan-50 transition-all duration-1000 ${
          qrUrl ? 'max-h-52' : 'max-h-0'
        }`}
      >
        <img src={qrUrl} alt="QR Code" />
      </footer>
    </div>
  );
}
