import goldStar from '../images/star-svgrepo-com.svg'
import star from '../images/star-outline-svgrepo-com.svg'
import '../styles/Pop.css'

function Pops({ id, imgUrl, number, name, series, rating, recent, deletedAt, updateArchiveState, deletePop}) {
  
  return (
      <div key={id} className="case">
        
        <img src={imgUrl} />

        <div className="rating-container">
          {[...Array(rating-0)].map((x, i) => <img src={goldStar} key={i}/>)} 
          {rating == 0 && <img src={star} />}
        </div>

        <div className="desc">
          {number != 0 ? <p>{number}</p> : <p> --</p>}
          <p>{name}</p>
          <p>{series}</p>
        </div>
        
        {recent ? <div className="new-pop">New!</div> : undefined}
        
        {deletedAt ? 
        <>
          <button className="pop-buttons" onClick={() => updateArchiveState(id, false)} 
          data-tooltip="Add the pop to your collection again">Add back</button>
          <button className="pop-buttons" onClick={() => deletePop(id)}
          data-tooltip="Permanently remove the pop">Delete</button>
        </>
        : 
        <>
          <button className="pop-buttons" onClick={() => updateArchiveState(id, true)}
          data-tooltip="Remove the pop from your current collection and save it in your archives">Archive</button>
          <button className="pop-buttons" style={{textDecoration: "line-through"}}>Edit</button>
        </>}
      </div>
  );
}

export default Pops;