import React from "react";

export default function Footer() {
  return (
    <div className="bottom-0 w-full">
      <div className="p-2 bg-ghost border-t-2 border-pnavy border-opacity-50 text-pnavy text-opacity-70">
        <div className="flex justify-center pt-2">
          <div className="w-80 px-1">
            <div className="font-bold text-lg">About poolsight</div>
            <p>
              poolsight is a client-management platform focused on empowering
              business owners in the pool service industry
            </p>
          </div>
          <div className="flex flex-col px-10">
            <div className="font-bold text-lg">Useful Links</div>
            <a
              href="https://github.com/memg92/poolsight/wiki"
              className="flex items-center mb-2"
            >
              <i className="fab fa-github p-1 mr-1 shadow-lg rounded-lg"></i>
              <div>poolsight Wiki</div>
            </a>
            <a
              href="https://github.com/memg92/poolsight/issues"
              className="flex items-center mb-2"
            >
              <i className="fab fa-github p-1 mr-1 shadow-lg rounded-lg"></i>
              <div>Report a bug</div>
            </a>
          </div>
          <div className="flex flex-col px-10">
            <div className="font-bold text-lg">Contact</div>
            <a
              href="mailto:memg92@gmail.com"
              className="flex items-center mb-2"
            >
              <i className="fas fa-envelope p-1 mr-1 shadow-lg rounded-lg"></i>
              <div>memg92@gmail.com</div>
            </a>
            <a
              href="https://github.com/memg92"
              className="flex items-center mb-2"
            >
              <i className="fab fa-github p-1 mr-1 shadow-lg rounded-lg"></i>
              <div>Github</div>
            </a>
            <a
              href="https://linkedin.com/in/miguel-munoz-4678b757"
              className="flex items-center mb-2"
            >
              <i className="fab fa-linkedin p-1 mr-1 shadow-lg rounded-lg"></i>
              <div>LinkedIn</div>
            </a>
          </div>
        </div>
        <div className="font-bold text-center py-2">
          Created by Miguel Munoz
        </div>
      </div>
      <div className="p-2 text-pnavy text-opacity-70 bg-ghost border-t-2">
        poolsight © 2020
      </div>
    </div>
  );
}
