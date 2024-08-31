"use client";

import ShareButton from "@app/(component)/commons/ShareButton";

export default function HeaderContent() {
  return (
    <div className="flex-1">
      <ul className="flex items-center custom:flex-row custom:items-center custom:flex">
        <li className="ml-1 custom:ml-0 custom:mb-2">
          <ShareButton />
        </li>
        <li className="ml-1 custom:ml-0 custom:mb-2">
          <ShareButton />
        </li>
        <li className="ml-1 custom:ml-0 custom:mb-2">
          <ShareButton />
        </li>
        <li className="ml-1 custom:ml-0 custom:mb-2">
          <ShareButton />
        </li>
      </ul>
    </div>
  );
}
