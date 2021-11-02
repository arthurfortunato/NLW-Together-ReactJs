import copyImg from '../../assets/copy.svg';

import './styles.scss';

import toast, { Toaster } from 'react-hot-toast';


type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    toast.success('Copy!')
  }

  <Toaster
    position="top-right"
    reverseOrder={false}
  />
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}