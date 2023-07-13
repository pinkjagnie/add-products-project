import React from "react";

const Footer = () => {
  return (
    <section id="footer" className="flex w-full py-2 bg-gray-500 text-zinc-100">
      <p className="w-[80%] text-center text-xs mx-auto">
        &copy; {new Date().getFullYear()} | Hello
      </p>
    </section>
  );
};

export default Footer;
