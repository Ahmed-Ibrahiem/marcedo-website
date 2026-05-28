import { FaShareNodes } from "react-icons/fa6";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import React from "react";

const SocialMediaActions = ({ colors }) => {
  return (
    <div className="text-xs! sm:text-sm! font-bold flex-start gap-2.5 sm:gap-7.5">
      <a href="##" className="flex items-center gap-1 hover:text-orange!">
        <FaShareNodes />
        <p>SHARE</p>
      </a>
      <a href="##" className="flex items-center gap-1 hover:text-orange!">
        <AiOutlineQuestionCircle />
        <p>ASK A QUESTION</p>
      </a>
      <a href="##" className="flex items-center gap-1 hover:text-orange!">
        <MdMessage />
        <p>FAG</p>
      </a>
    </div>
  );
};

export default React.memo(SocialMediaActions);
