import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { FC } from 'react';

import { deepMerge } from '@/libs/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

import { MdxPre } from './mdx-pre';

const defaultMdxOptions: Omit<MDXRemoteProps, 'source'> = {
    options: {
        mdxOptions: {
            rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
        },
    },
    components: {
        pre: MdxPre,
    },
};

export const MdxRemoteRender: FC<MDXRemoteProps> = (props) => {
    return <MDXRemote {...(deepMerge(defaultMdxOptions, props, 'merge') as MDXRemoteProps)} />;
};
