import React from "react";
import style from "../style/SharingModal.style.css"

const SharingModal = ({ showModal, onClose, SnapUrl }) => {

  /* Close the modal window */
  const closeModal = e => {
    showModal = false
    onClose(e)
  }
  /* Hide if showTos is false */
  if (!showModal)
    return null;

  const ShareImage = (e) => {

    switch (e.target.id) {
      case 'fb':
        window.open('http://www.facebook.com/sharer.php?u=' + { SnapUrl } + '&t=' + encodeURIComponent('Ar Snap'), 'sharer', 'toolbar=0,status=0,width=626,height=436');
        break;
      case 'instagram':
        // window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent({SnapUrl}) + '&t=' + encodeURIComponent('Ar Snap'), 'sharer', 'toolbar=0,status=0,width=626,height=436');
        break;
      case 'twitter':
        window.open('https://twitter.com/share?url=' + encodeURIComponent({ SnapUrl }), 'sharer', 'toolbar=0,status=0,width=626,height=436'); break;
      default:
        break;
    }

  }

  const downloadImage = (e) => {
    var link = document.createElement('a');
    link.download = 'MyAwesomePhoto.jpg';
    link.href = SnapUrl;
    link.click();
  }

  return (
    <div className="sharingModal">

      <div className="header">
        <h1>you look amazing!</h1>
      </div>

      <div className="photoWrapper" >
        <div className="photo">
          <img src={SnapUrl} alt="snap" />
        </div>
      </div>

      <div className="shareMessagingWrapper">
        <span className="shareMessaging">share this look with your friends!</span>
      </div>

      <div className="shareButtons">
        <ul>
          <li className="button-share"> <img src="img/Facebook.png" alt="" id="fb" onClick={ShareImage} /> </li>
          <li className="button-share"> <img src="img/Instagram.png" alt="" id="instagram" onClick={ShareImage} /> </li>
          <li className="button-share"> <img src="img/Twitter.png" alt="" id="twitter" onClick={ShareImage} /> </li>
          <li className="button-share"> <img src="img/Download.png" alt="" onClick={downloadImage} /> </li>
        </ul>
      </div>

      <button
        className="closeSharingModal"
        onClick={e => {
          closeModal(e);
        }}
      >X</button>

    </div>
  )
}

export default SharingModal