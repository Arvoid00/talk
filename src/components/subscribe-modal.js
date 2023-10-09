import { useAtom } from 'jotai';

import { subscribeModalAtom } from '~/atoms';
import { Modal } from '~/components/modal';

export const SubscribeModal = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useAtom(subscribeModalAtom);

  return (
    <Modal isOpen={isSubscribeModalOpen} onOpenChange={() => setIsSubscribeModalOpen(false)}>
      <iframe src="https://www.latent.space/embed" className="aspect-widest w-full" />
    </Modal>
  );
};
