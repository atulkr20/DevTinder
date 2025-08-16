const UserCard = ({user}) => {
  const { firstName, lastName, photoUrl, age, gender, about} = user;
    if(!user) return null;
    return (
<div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src= {user.photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " " + gender }</p> }
    <p>This is a default about</p>
    <div className="card-actions justify-center my-4 ">
      <button className="btn to-blue-600 btn-primary">Ignore</button>
      <button className="btn bg-pink-500 btn-secondary">Interested</button>
    </div>
  </div>
</div>    )
}
export default UserCard