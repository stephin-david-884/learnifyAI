import React from "react";

type Props = {
  open: boolean;
  onLogout: () => void;
};

const AccountBlockedModal: React.FC<Props> = ({ open, onLogout }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Account Blocked
        </h2>

        <p className="mt-2 text-gray-600">
          Your account has been blocked by the administrator.
        </p>

        <button
          onClick={onLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountBlockedModal;