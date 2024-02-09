"use client"
import * as React from 'react';
import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxProps {
  code: string;
  tweets?: Record<string, any>;
}


export function Mdx({code, tweets}: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <Component />
  )
}