"use client"

import DragAndDrop from '../../../components/dragandrop/draganddrop'


const styles = {
   
   padding: '2.5rem'
}

export default function BaseDoc() {
    return (
        <div style={styles}>
            <div>
               <DragAndDrop />
            </div>
        </div>
    )
  }
  