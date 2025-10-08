import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-slate-50">
      <img src="404_NotFound.png" alt="404" className="max-w-full mb-6 w-96 " />
      <p className="text-xl font-semibold">Trang này không tồn tại ! ⚠️</p>
      <a
        href="/"
        className="inline-block px-6 py-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
};

export default NotFoundPage;
