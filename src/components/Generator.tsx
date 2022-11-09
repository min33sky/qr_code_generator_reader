import { useState } from 'react';

export default function Generator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
    setQrUrl(code);
  };

  return (
    <div className="flex flex-col space-y-4">
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border-b border-b-slate-800 bg-transparent py-3 text-lg outline-none"
          placeholder="URL이나 간단한 Text를 남겨주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-slate-700 py-4 text-lg tracking-widest text-slate-200 transition hover:bg-slate-900">
          생성하기
        </button>
      </form>

      <footer
        className={`flex  items-center justify-center overflow-hidden rounded-md bg-slate-200 transition-all duration-1000 ${
          qrUrl ? 'max-h-52' : 'max-h-0'
        }`}
      >
        <img src={qrUrl} alt="QR Code" />
      </footer>
    </div>
  );
}
