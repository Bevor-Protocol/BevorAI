"use client";

import { Telegram, Twitter, Virtuals } from "@/assets/icons";
import NavBar from "@/components/nav-bar";
import { useWs } from "@/hooks/useContexts";
import { cn } from "@/lib/utils";
import { FileTextIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const { isConnected, reconnect } = useWs();
  return (
    <footer className="relative bottom-0 left-0 right-0 w-full text-white z-[100] py-4">
      <div className="text-sm md:hidden flex items-center justify-end">
        {isConnected ? (
          <p>
            <span
              className={cn(
                "h-1 w-1 rounded-full bg-green-400 inline-block",
                "align-middle mr-1 animate-pulse",
              )}
            />
            connected
          </p>
        ) : (
          <p>
            <span className="h-1 w-1 rounded-full bg-red-400 inline-block align-middle mr-1" />
            disconnected
            <RefreshCcw
              onClick={reconnect}
              height="12px"
              width="12px"
              className="cursor-pointer inline-block ml-1"
            />
          </p>
        )}
      </div>
      <NavBar className="md:hidden flex mb-2 w-full px-[20%]" />
      <div className="max-w-[1200px] justify-between m-auto md:flex hidden">
        <div className="flex flex-grow gap-8 items-center *:cursor-pointer z-10">
          <Link
            href="https://x.com/CertaiK_Agent"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Twitter />
          </Link>
          <Link
            href="https://t.me/CertaiKVirtuals"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Telegram />
          </Link>
          <Link
            href="https://app.virtuals.io/virtuals/9776"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Virtuals style={{ background: "rgb(68 188 195)", borderRadius: "12px" }} />
          </Link>
          <Link href="https://docs.certaik.xyz" className="hover:opacity-80 transition-opacity">
            <FileTextIcon height="24" width="24" />
          </Link>
        </div>
        <div className="text-sm flex items-center">
          {isConnected ? (
            <p>
              <span
                className={cn(
                  "h-1 w-1 rounded-full bg-green-400 inline-block",
                  "align-middle mr-1 animate-pulse",
                )}
              />
              connected
            </p>
          ) : (
            <p>
              <span className="h-1 w-1 rounded-full bg-red-400 inline-block align-middle mr-1" />
              disconnected
              <RefreshCcw
                onClick={reconnect}
                height="12px"
                width="12px"
                className="cursor-pointer inline-block ml-1"
              />
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
