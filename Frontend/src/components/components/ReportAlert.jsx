import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bell } from "lucide-react";

export default function ReportAlert() {
  useEffect(() => {
    toast.success(
      <div className="flex flex-col items-center justify-center p-4 bg-green-100 border border-green-500 rounded-lg shadow-md w-64">
        <Bell className="h-6 w-6 text-green-600" />
        <strong className="mt-2 text-green-800">Report Sent!</strong>
        <p className="text-green-700 text-sm text-center mt-1">
          Your report has been sent successfully.
        </p>
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      }
    );
  }, []);

  return <ToastContainer />;
}
