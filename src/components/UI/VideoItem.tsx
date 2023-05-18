import React, { useState, type FC, useRef } from "react";

interface IVideoItemProps {
   preview: string;
   source: string;
   className?: string;
}

export const VideoItem: FC<IVideoItemProps> = ({ preview, source, className }) => {
   const [isActive, setIsActive] = useState(false);
   const iframeRef = useRef<HTMLIFrameElement>(null);
   const previewRef = useRef<HTMLDivElement>(null);

   const classes = ["item-video"];
   if (className !== undefined) classes.push(className);

   const previewClasses = ["item-video__preview"];
   if (isActive) previewClasses.push("item-video__preview_d");

   const onVideoClickHandler = (): void => {
      setIsActive(true);
      setTimeout(() => {
         // if (previewRef.current !== null) previewRef.current.hidden = true;
         if (iframeRef.current !== null) iframeRef.current.hidden = false;
      }, 500);
   };

   return (
      <div className={classes.join(" ")} onClick={onVideoClickHandler}>
         {isActive && (
            <iframe
               src={source + "?autoplay=1"}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowFullScreen
               ref={iframeRef}
               hidden
            ></iframe>
         )}
         <div className={previewClasses.join(" ")} ref={previewRef}>
            <img src={preview} alt="" />
         </div>
      </div>
   );
};
