import { FC } from "react";
import { Dialog } from "@headlessui/react";
import IndexSearch from ".";

type Props = {
  open: boolean;
  onClose: () => void;
};

const IndexSearchDialog: FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-[100%] lg:w-[600px] rounded bg-white">
          <IndexSearch />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default IndexSearchDialog;
