import { useCallback, useRef, useState } from "react";
import { FaCopy, FaRegCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import { Code, CodeProps } from "@/lib/react-syntax-highlighter";

import { Button } from "../Button/Button";

export type StylishCodeProps = CodeProps & {
  className?: string,
}

export const StylishCode: React.FC<StylishCodeProps> = (props) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(props.children.toString());
    setIsCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setIsCopied(false), 3000);
  }, [props.children]);

  return (
    <div className={clsx('p-5 shadow-lg bg-gradient-to-br from-blue-300 via-blue-400 to-orange-300 rounded-lg', props.className)}>
      <div className="relative group">
        <Code {...props} className="rounded-lg shadow">
          {props.children}
        </Code>
        <div className="transition opacity-0 group-hover:opacity-100 p-2 absolute top-0 right-0">
          <Button type="white" onPress={handleCopy}>
            <div className="relative w-4 h-4">
              <FaCopy className={clsx('transition absolute', isCopied ? 'opacity-0' : 'opacity-100')} />
              <FaRegCheckCircle className={clsx('transition absolute', !isCopied ? 'opacity-0' : 'opacity-100')} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};