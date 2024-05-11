import { Link } from 'react-router-dom';
import './Card.css'

function Card(props){
    return (
        <div className="card aayush mb-3" style={{ width: '18rem', height: 'fit-content' }}>
            <div style={{ height: '17rem', overflow: 'hidden' }}>
               
                <Link to={`/productdetails/${props.id}`}>
                <img
                    src={props.image}
                    alt=""
                    className="card-img-top"
                    style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'transform 0.3s' }}
                    onClick={() => window.scrollTo(0,0)}
                />
                </Link>
            </div>
            <div className="card-body">
                <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.name}</h5>
                <div>
                    <p className="card-text font-weight-bold">₹{props.new_price}</p>
                    <p className="card-text text-secondary"><s>₹{props.old_price}</s></p>
                </div>
            </div>
        </div>
    );
}

export default Card;
