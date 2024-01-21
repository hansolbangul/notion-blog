"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Bars4Icon } from "@heroicons/react/20/solid";
import useQuery from "@/src/hook/useQuery";

type Props = {
  tags: {
    [index: string]: number;
  };
};

const Dropdown = ({ tags }: Props) => {
  const params = useQuery();
  const selectTag = params.get("tag") || "All";

  const setTag = (tag: string) => {
    if (window.location.pathname !== "/") {
      params.customSet("/", "tag", tag);
      return;
    }

    if (selectTag === tag) {
      params.set("tag", "");
    } else {
      params.set("tag", tag);
    }
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Bars4Icon
              className="h-5 w-5 text-black hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 h-80 overflow-y-scroll scrollbar-hide min-w-[180px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {Object.keys(tags).map((key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      onClick={() => setTag(key)}
                      className={`${
                        key === selectTag
                          ? "bg-gray-300"
                          : active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-between`}
                    >
                      <span>{key}</span>
                      <span>({tags[key]})</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
