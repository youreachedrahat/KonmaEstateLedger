import * as React from 'react';
import Modal from '@mui/material/Modal';


const CommunityModal = ({open, setOpen}) => {


  
  const handleClose = () => setOpen(false);

  return (
    <div>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div class=" bg-white  dark:bg-gray-700 h-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 border-black shadow-lg p-4 rounded-sm overflow-hidden">
            <div class="flex items-center justify-between mb-5 ">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    You are not Autorized to Accept.
                </h3>

            </div>
                <button type="button" 
                onClick={handleClose}
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">I Understand</button>
        </div>

      </Modal>
    </div>
  );
}


export default CommunityModal;
