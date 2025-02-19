import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Modal, ModalProvider, useModalContext } from '@/components/Modal';

import { ThemeToggle } from './ThemeToggle';
import { Buttons, LogoButton } from './Buttons';

export function MicroSidebar() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}

function Content() {
  const { hide } = useModalContext();

  return (
    <>
      {/* ghost div to compensate the top fixed bar in the static (default) flow */}
      <div className="h-16 w-full shrink-0" />

      <div className="transitionChildren fixed top-0 z-10 flex h-16 w-full shrink-0 flex-row items-center justify-between bg-theme-1 px-4 text-white-neutral">
        <BurgerButton />
        <LogoButton />
      </div>

      <Modal
        className="top-16 z-20 flex w-full flex-col items-stretch justify-between bg-theme-1 p-6 text-white-neutral"
        from="opacity-0 h-0"
        to="opacity-100 h-[calc(100vh-4rem)]"
      >
        <div className="flex flex-col gap-8">
          <Buttons row labels onClick={hide} />
        </div>
        <div className="flex flex-col gap-8">
          <ThemeToggle labels />
        </div>
      </Modal>

      <div className="fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg bg-theme-1">
        <Buttons labels />
      </div>
    </>
  );
}

function BurgerButton() {
  const { isOpen, show, hide } = useModalContext();
  const Icon = isOpen ? XMarkIcon : Bars3Icon;

  return (
    <button
      onClick={() => {
        if (!isOpen) {
          show();
        } else {
          hide();
        }
      }}
    >
      <Icon className="h-8 w-8" />
    </button>
  );
}
