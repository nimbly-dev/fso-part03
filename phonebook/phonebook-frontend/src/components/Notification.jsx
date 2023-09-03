/* eslint-disable react/prop-types */

const Notification = ({ notification }) => {
    if (notification.message === null || notification.message === '') {
      return <></>
    }
  
    return (
      <div className={notification.className}>
        <p>{notification.message}</p>
      </div>
    )
}


export default Notification