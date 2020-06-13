import React from 'react';
import { Button } from 'primereact/button';
import { openExternal } from '../shared/utilities';

export function Abstract() {
  const gDocLink = "https://docs.google.com/document/d/1-71FJTmI1Q1kjSDLP0EegMERjg_0kk_7UfaRE4r66Mg/edit";
  return (
    <div className='flex-column'>
      <Button
        onClick={openExternal(gDocLink)}
        style={{alignSelf: 'center'}}
        label='Open Source Medical Supply Guide'></Button>
    </div>
  )
}