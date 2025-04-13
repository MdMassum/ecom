import { ImSpinner2 } from "react-icons/im";

const LoaderModal = () => {

  return (
    <div className="w-full h-full fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className=" p-6 rounded-2xl flex flex-col items-center">
        <ImSpinner2 className="animate-spin text-blue-600 text-4xl mb-4" />
        <p className="text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoaderModal;
