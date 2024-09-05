import { useContext } from "react";
import TicketModal from "./TicketModal";
import { AuthContext } from "../context/AuthContext";

export const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gray-900">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-gray-500">
            © Copyright 2024 Hasnat. All rights reserved.
          </p>
          {user && (
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <TicketModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
