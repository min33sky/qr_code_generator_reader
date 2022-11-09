import { useState } from 'react';
import Generator from './components/Generator';
import Reader from './components/Reader';

const titleMap = {
  Generator: 'QR Code Generator',
  Reader: 'QR Code Reader',
};

type Tab = keyof typeof titleMap;

export default function App() {
  const [mode, setMode] = useState<Tab>('Reader');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-tr from-slate-800 to-slate-500">
      <div className="w-11/12 max-w-xl space-y-4 rounded-lg bg-slate-100 px-6 py-10">
        <header className="flex flex-col space-y-2 ">
          <h1 className="text-center text-3xl font-bold text-slate-700 ">
            {titleMap[mode]}
          </h1>
          <nav className="flex justify-end gap-4">
            <button
              className="rounded-md bg-slate-700 px-5 py-2 tracking-wider text-slate-100 transition hover:bg-slate-900"
              onClick={() => setMode('Generator')}
            >
              생성
            </button>
            <button
              className="rounded-md bg-slate-700 px-5 py-2 tracking-wider text-slate-100 transition hover:bg-slate-900"
              onClick={() => setMode('Reader')}
            >
              읽기
            </button>
          </nav>
        </header>

        <div className="mx-auto h-0.5 w-full  bg-slate-400"></div>

        <section>
          {mode === 'Generator' && <Generator />}
          {mode === 'Reader' && <Reader />}
        </section>
      </div>
    </main>
  );
}
