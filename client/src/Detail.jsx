import { Link } from "react-router-dom";
function Detail({title}){
    return (
    <main className="card mb-3">
        <div>
        {title} 
        <Link to="detail"> Link</Link>
        </div>
    </main>
    );
}
export default Detail;