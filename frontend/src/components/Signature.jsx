import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = ({onSave,setSignature,loading}) => {

    const sigCanvas = useRef(null);

    const clearSignature = () => {
        setSignature(null)
        sigCanvas.current.clear();
    }

    const saveSignature = () => {
        const signatureDataUrl = sigCanvas.current.toDataURL();
        onSave(signatureDataUrl);
    }

  return (
    <div>
        <SignatureCanvas 
            ref={sigCanvas}
            backgroundColor='white'
            penColor='black'
            canvasProps={{width: 500, height: 200, className: 'signature-canvas border-2 border-slate-300 rounded-md mb-4'}}
        />
        <button onClick={clearSignature} className='py-1 px-3 mr-3 border-2 border-slate-200'>Clear</button>
        <button onClick={saveSignature} className='py-1 px-3 border-2 border-slate-200'>{loading? 'Please wait' : 'Save Signature'}</button>
    </div>
  )
}

export default Signature