import {expect,it,vi} from 'vitest';
vi.mock('next/navigation',()=>({useRouter:()=>({push:()=>{}})}));
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
import Page from '../app/page';
import {PlanProvider} from '../components/plan-provider';
it('welcomes the owner and offers labeled problem entry',()=>{
  const markup=renderToStaticMarkup(<PlanProvider><Page/></PlanProvider>);
  expect(markup).toContain('What problem are you facing?');
  expect(markup).toContain('textarea');
  expect(markup).toContain('Submit');
});
