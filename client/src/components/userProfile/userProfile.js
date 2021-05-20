import './userProfile.css';


const UserProfile = () => {
  return (
    <div className="user-profile">

      <div className="user-profile__header">
        <h1 className="user-profile__heading">User Info</h1>

      </div>

      <div className="user-profile__body">
        <div className="user-profile__description">
          <h4 className="user-profile__name">Name: asdasd</h4>
          <h4 className="user-profile__age">Age: asdasd</h4>
          <h4 className="user-profile__phone-number">Number: asdasd</h4>
        </div>

        <div className="buttons-wrapper">
          <button className="edit-profile-btn">Edit</button>
          <button className="delete-profile-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
