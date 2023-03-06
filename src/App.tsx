import { useState } from 'react';
import Generator from './components/Generator';
import Reader from './components/Reader';
import {
  QrCodeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const titleMap = {
  Generator: 'QR 코드 생성기',
  Reader: 'QR 코드 리더기',
};

type Tab = keyof typeof titleMap;

export default function App() {
  const [mode, setMode] = useState<Tab>('Reader');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-tr from-cyan-900 to-cyan-600">
      <div className="w-11/12 max-w-xl space-y-6 rounded-lg bg-cyan-50 px-4 py-6">
        <header className="flex flex-col space-y-4 ">
          <QrCodeIcon className="mx-auto h-12 w-12 text-cyan-600" />
          <h1 className="text-center text-2xl font-bold text-cyan-700 ">
            {titleMap[mode]}
          </h1>

          <nav className="flex space-x-1">
            <button
              aria-label='Button to switch to "Generator" mode'
              title="생성 모드로 전환"
              className={`flex flex-1 items-center justify-center space-x-1 rounded-md border px-5 py-2 tracking-widest transition duration-200 ${
                mode === 'Generator'
                  ? 'bg-cyan-600 text-cyan-100'
                  : 'border-cyan-600 bg-cyan-50 text-cyan-600'
              }`}
              onClick={() => setMode('Generator')}
            >
              <PlusIcon className="h-6 w-6" />
            </button>

            <button
              aria-label='Button to switch to "Reader" mode'
              title="읽기 모드로 전환"
              className={`flex flex-1 items-center justify-center space-x-1 rounded-md border px-5 py-2 tracking-widest transition duration-200 ${
                mode === 'Reader'
                  ? 'bg-cyan-600 text-cyan-100'
                  : 'border-cyan-600 bg-cyan-50 text-cyan-600'
              }`}
              onClick={() => setMode('Reader')}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </nav>
        </header>

        <div className="mx-auto h-0.5 w-6/12  bg-cyan-400"></div>

        <section>
          {mode === 'Generator' && <Generator />}
          {mode === 'Reader' && <Reader />}
        </section>
      </div>
    </main>
  );
}
